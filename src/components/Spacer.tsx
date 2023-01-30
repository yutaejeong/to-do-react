type SpacerPropsType = {
    height: 32 | 64 | 128;
}

export default function Spacer({ height }: SpacerPropsType) {
    return (
        <div style={{ height }} />
    );
}