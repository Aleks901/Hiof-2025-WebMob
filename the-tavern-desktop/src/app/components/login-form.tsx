import { BasicForm } from './basic-form'

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


const styles = {
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#000000ff'
    },

    formStyle: {
        display: 'flex',
        flexDirection: 'column' as const,
        border: '10px solid #ddd',
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#1affff',
        boxShadow: '0 0 10px rgba(26,255,255,0.8)',
    },

    buttonStyle: {
        background: 'aqua',
        border: '2px solid #000',
        borderRadius: 12,
    },

    titleStyle: {
        fontSize: 24
    }

}