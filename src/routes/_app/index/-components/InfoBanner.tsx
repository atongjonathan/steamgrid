import { Banner, BannerClose, BannerIcon, BannerTitle, BannerAction } from '@/components/ui/shadcn-io/banner';
import { CircleAlert } from 'lucide-react';


const InfoBanner = () => {
    return (
        <Banner className="border border-white rounded mx-1">
            <BannerIcon icon={CircleAlert} />
            <BannerTitle>
                You are currently using the new improved UI experience.
            </BannerTitle>
            <BannerAction
                className="bg-main border border-white hover:bg-main/70 hover:text-white"
                asChild
            >
                <a rel="noopener" href="https://streamgrid.stream" target="_blank">
                    Go back
                </a>
            </BannerAction>
            <BannerClose />
        </Banner>
    )
}

export default InfoBanner
