import '../../styling/basic-card.css';

type BasicCardProps = {
    image?: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
};

export default function BasicCard({
    image,
    title,
    description,
    children,
}: BasicCardProps) {
    return (
        <div className="basic-card">
            {image && (
                <img 
                    src={image} 
                    alt={title} 
                    className="basic-card-image"
                />
            )}
            <div className="basic-card-content">
                <h3 className="basic-card-title">{title}</h3>
                {description && (
                    <p className="basic-card-description">{description}</p>
                )}
                {children && (
                    <div className="basic-card-children">{children}</div>
                )}
            </div>
        </div>
    );
}
