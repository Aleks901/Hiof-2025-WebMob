import { BasicForm } from './basic-form'
import { useTheme } from '../lib/useTheme';

export default function LoginForm(){

    return (
        <BasicForm 
            title='Login' 
            formStyles={{
                formStyle: styles.formStyle,
                buttonStyle: styles.buttonStyle,
                titleStyle: styles.titleStyle
            }}
        >
            <div style={styles.inputContainer}>
                <input type="text" placeholder='Username' />
            </div>
            <div style={styles.inputContainer}>
                <input type="password" placeholder='Password' />
            </div>
        </BasicForm>
    );
}

const theme = useTheme();

const styles = {
    
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#000000ff'
    },

    formStyle: {
        display: 'flex',
        flexDirection: 'column' as const,
        border: `10px solid ${theme.highlight}`,
        padding: 14,
        borderRadius: 12,
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.highlight,
        boxShadow: `0 0 10px ${theme.hover}`,
    },

    buttonStyle: {
        background: theme.highlight,
        border: `2px solid ${theme.card}`,
        borderRadius: 12,
    },

    titleStyle: {
        fontSize: 24
    }

}