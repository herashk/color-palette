import { DRAWER_WIDTH } from '../constants';

const styles = theme =>  ({
    root: {
        display: "flex"
      },
      drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0
      },
      drawerPaper: {
        width: DRAWER_WIDTH,
        display: "flex",
        alignItems: "center"
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        width: "100%",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
      },
      content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)", // substracting height of the appBar
        padding: 0,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -DRAWER_WIDTH,
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      },
      buttons: {
          width: "100%"
      },
      button: {
          width: "50%"
      },
      container: {
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
      }
})

export default styles;