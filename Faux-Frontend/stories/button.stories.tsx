import Button from "../components/button/index";
import {ButtonProps} from "../components/button/types"
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Button',
    component: Button,
} as ComponentMeta<typeof Button>;
  
const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    variant: 'primary',
    children: "button",
};