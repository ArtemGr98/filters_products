import {useDispatch, useSelector} from "react-redux";
import {logoutAsync} from "../../redux/authSlice";
import {useSearchParams} from "react-router-dom";
import {HeaderContainer, HeaderProfileBlock} from "./HeaderStyled";

const Header = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const {isAuth, profile_image, name, email} = useSelector(state => state.auth.user)

    const logout = () => {
        dispatch(logoutAsync())
        setSearchParams({})
    }

    return (
        <header>
            {isAuth ? <HeaderContainer>
                <HeaderProfileBlock>
                    <img src={profile_image} alt="profile_image"/>
                    <div>
                        <div>
                            {name}
                        </div>
                        <div>
                            {email}
                        </div>
                    </div>
                </HeaderProfileBlock>
                <button onClick={logout}>Logout</button>
            </HeaderContainer> : <HeaderContainer>
                No authorization
            </HeaderContainer>}
        </header>
    );
};

export default Header;