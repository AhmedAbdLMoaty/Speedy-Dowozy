import React from "react";
import styles from "./Typography.module.css";

interface TypographyProps {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "small";
    weight?:
        | "light"
        | "normal"
        | "medium"
        | "semibold"
        | "bold"
        | "extrabold"
        | "black";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    color?: "primary" | "secondary" | "muted" | "brand";
    className?: string;
    children: React.ReactNode;
    as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
    variant = "p",
    weight,
    size,
    color = "primary",
    className = "",
    children,
    as,
    ...props
}) => {
    const Component = as || variant;

    const classes = [
        styles.typography,
        variant && styles[variant],
        weight &&
            styles[`weight${weight.charAt(0).toUpperCase() + weight.slice(1)}`],
        size && styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
        color &&
            styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

export default Typography;
