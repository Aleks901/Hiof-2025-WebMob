
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
        <div style={styles.card}>
            {image && <img src={image} alt={title} style={styles.image}/>}
            <h3 style={styles.title}>{title}</h3>
            {description && <p style={styles.description}>{description}</p>}
            {children && <div style={styles.children}> {children}</div>}
        </div>
    )
}

const styles = {
    card: {

    },

    image: {

    }, 

    title: {                            //Current skeleton placeholder for future styling

    },

    description: {

    },

    children: {

    }

}
