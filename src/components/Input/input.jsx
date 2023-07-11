import { forwardRef } from "react"

const Input = forwardRef(( {id, label, error, ...rest}, ref ) => {
    return(
        <div>
            {label ? <label>{label}</label> : null}
            <input id={id} ref={ref} {...rest}/>
            {error ? <p>{error}</p> : null}
        </div>
    )
})
export default Input