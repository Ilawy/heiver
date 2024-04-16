'use client'

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
    confirm?: boolean | string
}

export default function Formatic({
    confirm: shouldConfirm = false,
    ...props
}: Props){

    return (
        <form {...props} onSubmit={ev=>{
            if(shouldConfirm){
                if(!confirm(typeof shouldConfirm === 'string' ? shouldConfirm : "Are you sure you want to do this action?")){
                    ev.preventDefault()
                }
            }
            
        }}>
            {props.children}
        </form>
    )
}