import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3"
import { fn, within, userEvent, expect } from "@storybook/test"

import { ErButton, ErButtonGroup } from "zanwu-toy-element"

type Story = StoryObj<typeof ErButton> & { argTypes?: ArgTypes }

/*
  元数据
*/
const meta: Meta<typeof ErButton> = {
  title: "Example/Button",
  component: ErButton,
  // 子菜单页
  subcomponents: { ButtonGroup: ErButtonGroup },
  // 左侧菜单的docs
  tags: ["autodocs"],
  argTypes: {
    type: {
      // ! 控制器类型 下拉框
      control: { type: "select" },
      // ! 可选值
      options: ["primary", "success", "warning", "danger", "info", ""]
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""]
    },
    disabled: {
      // ! 布尔类型
      control: "boolean"
    },
    loading: {
      control: "boolean"
    },
    loadingIcon: {
      control: { type: "text" }
    },
    useThrottle: {
      control: "boolean"
    },
    throttleDuration: {
      control: "number"
    },
    autofocus: {
      control: "boolean"
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"]
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""]
    },
    icon: {
      control: { type: "text" }
    }
  },
  args: { onClick: fn() }
}

// 容器 放置组件的地方
const container = (val: string) => `
  <div style="margin:5px">
    ${val}
  </div>
`

/*
  左侧菜单的default
*/
export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" }
    }
  },
  args: {
    type: "primary",
    content: "Button"
  },
  render: (args) => ({
    components: { ErButton },
    setup() {
      return { args }
    },
    template: container(`
      <er-button v-bind="args">
        {{args.content}}
      </er-button>
    `)
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step("click button", async () => {
      await userEvent.tripleClick(canvas.getByRole("button"))
    })

    expect(args.onClick).toHaveBeenCalled()
  }
}

/*
  左侧菜单的circle
*/
export const Circle: Story = {
  args: {
    icon: "search"
  },
  render: (args) => ({
    components: { ErButton },
    setup() {
      return { args }
    },
    template: container(`
      <er-button circle v-bind="args"/>
    `)
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"))
    })

    expect(args.onClick).toHaveBeenCalled()
  }
}

Circle.parameters = {}

/*
  左侧菜单的Group
*/
export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""]
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""]
    },
    groupDisabled: {
      control: "boolean"
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1"
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2"
    }
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2"
  },
  render: (args) => ({
    components: { ErButton, ErButtonGroup },
    setup() {
      return { args }
    },
    template: container(`
      <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
        <er-button v-bind="args">{{args.content1}}</er-button>
        <er-button v-bind="args">{{args.content2}}</er-button>
      </er-button-group>
    `)
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"))
    })
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"))
    })
    expect(args.onClick).toHaveBeenCalled()
  }
}

export default meta
