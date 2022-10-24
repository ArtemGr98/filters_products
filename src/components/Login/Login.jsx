import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {loginAsync} from "../../redux/authSlice";
import {ValidationErrorText, LoginContainer} from "./LoginStyled";

const Login = () => {

    const dispatch = useDispatch()

    return <>
        <LoginContainer>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email()
                        .required("Required"),
                    password: Yup.string()
                        .min(8, "Must be longer than 8 characters")
                        .required("Required")
                })}
                onSubmit={
                    (values, actions) => {
                        dispatch(loginAsync(values))
                    }}
            >
                {
                    props => (
                        <Form>
                            <div>
                                <Field type="email" name="email" placeholder="Email"/>
                                <ErrorMessage name="email" component={ValidationErrorText}/>
                            </div>

                            <div>
                                <Field type="password" name="password" placeholder="Password"/>
                                <ErrorMessage name="password" component={ValidationErrorText}/>
                            </div>

                            <button type="submit">send</button>
                        </Form>
                    )
                }
            </Formik>
        </LoginContainer>
    </>
}

export default Login