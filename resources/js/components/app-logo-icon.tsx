type AppLogoIconProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function AppLogoIcon(props: AppLogoIconProps) {
    return (
        <img
            src="/hinobaan-logo/Hinobaan_logo.png"
            alt="Municipality of Hinoba-an"
            className="size-full object-contain"
            {...props}
        />
    );
}
