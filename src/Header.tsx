import {AppBar, IconButton, Switch, Toolbar} from "@mui/material";
import Container from "@mui/material/Container";
import {containerSx} from "@/components/TodoList/TodolistItem.styles.ts";

import {NavButton} from "@/components/Button/NavButton.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()



    // const theme = createTheme({
    //     palette: {
    //         mode: themeMode,
    //         primary: {
    //             main: '#087EA4',
    //         },
    //     },
    // })

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
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