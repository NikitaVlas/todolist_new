import {AppBar, IconButton, Switch, Toolbar} from "@mui/material";
import Container from "@mui/material/Container";
import {NavButton} from "@/components/NavButton/NavButton.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth={'lg'} >
                    <IconButton color="inherit">
                        {/*<MenuIcon/>*/}
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={'dodgerblue'}>Faq</NavButton>
                        <Switch color={"default"} onChange={changeMode}></Switch>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;