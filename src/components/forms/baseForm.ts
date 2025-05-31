import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { Input } from "@/components/ui/input"

const { fieldContext, formContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldComponents: {
        Input
    },
    formComponents: {},
    fieldContext,
    formContext,
})