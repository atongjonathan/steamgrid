import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type IconType } from "react-icons";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
  MdOutlineBookmark,
  MdOutlineStopCircle,
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiCheckDoubleFill } from "react-icons/ri";
import { ImSpinner8 } from "react-icons/im";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { useLocation } from "@tanstack/react-router";
import {
  updateUser,
  type BannerMovie,
  type Movie,
  type ResponseUser,
  type UserUpdatePayload,
} from "@/api";
import { Plus } from "lucide-react";

// Type for ActionButton
interface Action {
  Icon: IconType;
  label: string;
  name: keyof Pick<ResponseUser, "plan" | "hold" | "dropped" | "finished">;
  enabled: boolean;
}

// Power Button Component
const PowerButton2: React.FC<{ actions: Action[] }> = ({ actions }) => {
  const activeItem = actions.find((action) => action.enabled);
  const ActionIcon = activeItem?.Icon;

  return (
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm">
        {ActionIcon ? <ActionIcon /> : <Plus size={28} />}
        {activeItem?.label ?? "Add"}
      </Button>
    </PopoverTrigger>
  );
};

// Main Actions Component
const Actions: React.FC<{ movie: BannerMovie | Movie }> = ({ movie }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const id = movie?.id;

  const actions: Action[] = [
    {
      Icon: MdOutlineBookmark,
      label: "Saved",
      name: "plan",
      enabled: !!user?.plan?.some((m) => m.id === id),
    },
    {
      Icon: MdOutlineStopCircle,
      label: "On Hold",
      name: "hold",
      enabled: !!user?.hold?.some((m) => m.id === id),
    },
    {
      Icon: IoMdClose,
      label: "Dropped",
      name: "dropped",
      enabled: !!user?.dropped?.some((m) => m.id === id),
    },
    {
      Icon: RiCheckDoubleFill,
      label: "Finished",
      name: "finished",
      enabled: !!user?.finished?.some((m) => m.id === id),
    },
  ];

  const ActionIcon = actions.find((action) => action.enabled)?.Icon;

  return (
    movie && (
      <Popover>
        {pathname.includes("watch") ? (
          <PowerButton2 actions={actions} />
        ) : (
          <PopoverTrigger asChild>
            <Button size="icon" className="bg-subMain text-white rounded-full">
              {ActionIcon ? <ActionIcon /> : <Plus />}
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="w-44 p-1 bg-main/70 backdrop-blur border-white text-white rounded-xl space-y-1">
          {actions.map((action, idx) => (
            <ActionItem key={idx} {...action} id={movie?.id} />
          ))}
        </PopoverContent>
      </Popover>
    )
  );
};

export default Actions;

// ActionItem props
interface ActionItemProps extends Action {
  id: number;
}

// ActionItem Component
const ActionItem: React.FC<ActionItemProps> = ({
  Icon,
  label,
  name,
  id,
  enabled,
}) => {
  const { user, fetchUser } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateMe"],
    mutationFn: async (
      data: Partial<
        Record<
          "plan_ids" | "hold_ids" | "dropped_ids" | "finished_ids",
          number[]
        >
      >
    ) => {
      if (!user) throw new Error("No user");

      const {
        plan = [],
        hold = [],
        finished = [],
        dropped = [],
        favourites = [],
        image,
        ...baseUser
      } = user;
      const newUser = { ...baseUser, ...data };

      await updateUser(newUser);
      await fetchUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userQuery"] });
    },
  });

  const handleClick = () => {
    if (!user) {
      toast.info("Please login to add movies collections");
      return;
    }

    const update: UserUpdatePayload = {
      plan_ids: user.plan?.filter((m) => m.id !== id).map((m) => m.id) || [],
      hold_ids: user.hold?.filter((m) => m.id !== id).map((m) => m.id) || [],
      dropped_ids:
        user.dropped?.filter((m) => m.id !== id).map((m) => m.id) || [],
      finished_ids:
        user.finished?.filter((m) => m.id !== id).map((m) => m.id) || [],
    };

    if (!enabled) {
      const key = `${name}_ids` as keyof typeof update;
      update[key]?.push(id);
    }

    mutate(update);
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-between py-2 px-3 hover:bg-main/80 text-white text-sm flex items-center"
      onClick={handleClick}
    >
      <div className="flex gap-2 items-center">
        <Icon />
        <span>{label}</span>
      </div>
      {isPending ? (
        <ImSpinner8 />
      ) : enabled ? (
        <MdOutlineRadioButtonChecked />
      ) : (
        <MdOutlineRadioButtonUnchecked />
      )}
    </Button>
  );
};
