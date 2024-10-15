'use client'

import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

import { CreateResourceSchema, CreateResourceValues } from '@/schemas/event/resource.schema'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { createResource, updateResource } from '@/actions/resource.action'
import { Resource } from '@/types/event/resource.type'

type FormResourceProps = {
  resource?: Resource
}

export const FormResource = ({ resource }: FormResourceProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreateResourceValues>({
    resolver: zodResolver(CreateResourceSchema),
    defaultValues: {
      name: resource?.name || '',
      quantity: resource?.quantity || 0,
      consumable: resource?.consumable || false
    }
  })

  useEffect(() => {
    if (resource) {
      form.reset({
        name: resource.name,
        quantity: resource.quantity,
        consumable: resource.consumable
      })
    }
  }, [resource, form])

  const onSubmit = (data: CreateResourceValues) => {
    startTransition(async () => {
      const response = resource
        ? await updateResource({ resourceId: resource.id, ...data })
        : await createResource(data as CreateResourceValues)
      const {
        success,
        message
      } = response

      if (success) {
        toast.success(message)
        router.push('/resources')
        router.refresh()
      } else {
        toast.error(message)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nama</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Masukan nama peralatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Jumlah</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      inputMode="numeric"
                      placeholder="Masukan Jumlah Peralatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consumable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className={`${isPending ? 'text-gray-500 cursor-not-allowed' : ''}`}>
                      Barang Habis Pakai?
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit">
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {resource ? 'Update' : 'Simpan'}
          </Button>
        </form>
      </Form>
    </>
  )
}
