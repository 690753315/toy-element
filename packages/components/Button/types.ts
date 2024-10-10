import type { Component, Ref, ComputedRef } from "vue"

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info"

export type NativeType = "button" | "reset" | "submit"

export type ButtonSize = "small" | "default" | "large"

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  nativeType?: NativeType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  icon?: string
  circle?: boolean
  plain?: boolean
  round?: boolean
  autofocus?: boolean
  useThrottle?: boolean
  throttleDuration?: number
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void
}

// 对外暴露的属性
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  size: ComputedRef<ButtonSize | "">
  type: ComputedRef<ButtonType | "">
  disabled: ComputedRef<boolean>
}

export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}
