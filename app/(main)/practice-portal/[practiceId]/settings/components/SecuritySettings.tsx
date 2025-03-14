"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ShieldCheck } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const securitySettingsSchema = z.object({
  twoFactorEnabled: z.boolean(),
  twoFactorMethod: z.enum(["app", "sms", "email"]),
  passwordComplexity: z.number().min(1).max(3),
  passwordExpiry: z.number().min(30).max(180),
})

type PasswordFormValues = z.infer<typeof passwordFormSchema>
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>

const defaultPasswordValues: Partial<PasswordFormValues> = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const defaultSecurityValues: SecuritySettingsValues = {
  twoFactorEnabled: false,
  twoFactorMethod: "app",
  passwordComplexity: 2,
  passwordExpiry: 90,
}

export default function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingsValues>(defaultSecurityValues)

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: defaultPasswordValues,
  })

  const securityForm = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: securitySettings,
  })

  function onPasswordSubmit(data: PasswordFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
      passwordForm.reset(defaultPasswordValues)
      console.log(data)
    }, 1000)
  }

  function onSecuritySubmit(data: SecuritySettingsValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSecuritySettings(data)
      toast({
        title: "Security settings updated",
        description: "Your security preferences have been updated successfully.",
      })
      console.log(data)
    }, 1000)
  }

  function handleResetPassword() {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password.",
      })
    }, 1000)
  }

  const complexityLabels = ["Basic", "Standard", "High"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Management</CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your new password" {...field} />
                    </FormControl>
                    <FormDescription>Password must be at least 8 characters long.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>

                <Button type="button" variant="outline" onClick={handleResetPassword} disabled={isLoading}>
                  Send Password Reset Email
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
         
        </CardHeader>
        <CardContent>
          <Form {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
              <FormField
                control={securityForm.control}
                name="twoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Two-Factor Authentication</FormLabel>
                      <FormDescription>Require a second form of verification when signing in.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {securityForm.watch("twoFactorEnabled") && (
                <FormField
                  control={securityForm.control}
                  name="twoFactorMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Authentication Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="app" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Authenticator App (Google Authenticator, Authy)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="sms" />
                            </FormControl>
                            <FormLabel className="font-normal">SMS Text Message</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="email" />
                            </FormControl>
                            <FormLabel className="font-normal">Email</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Practice Security Settings</h3>
                <p className="text-sm text-muted-foreground">These settings apply to all users in your practice.</p>

                <FormField
                  control={securityForm.control}
                  name="passwordComplexity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Complexity Requirements</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={1}
                            max={3}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="flex justify-between">
                            {complexityLabels.map((label, index) => (
                              <span
                                key={label}
                                className={`text-xs font-medium ${index + 1 === field.value ? "text-primary" : "text-muted-foreground"}`}
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {field.value === 1 && "Basic: Minimum 8 characters"}
                        {field.value === 2 && "Standard: Minimum 10 characters with numbers and special characters"}
                        {field.value === 3 &&
                          "High: Minimum 12 characters with uppercase, lowercase, numbers, and special characters"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={securityForm.control}
                  name="passwordExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Expiry (Days)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={30}
                            max={180}
                            step={30}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="flex justify-between">
                            <span className="text-xs">30 days</span>
                            <span className="text-xs">90 days</span>
                            <span className="text-xs">180 days</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Users will be required to change their password every {field.value} days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="flex gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Save Security Settings
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

