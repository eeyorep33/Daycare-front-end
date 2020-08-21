import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';


const turquiose= "#00FFFF";
const orange = "#FF8C00"
let theme = createMuiTheme({
    palette: {
common: {
    aqua: `${turquiose}`,
    orange: `${orange}`
},
primary:{
    main: `${turquiose}`
},
secondary: {
    main: `${orange}`
}
    },
    typography: {
        fontFamily: "'El Messiri', sans-serif;",
        fontSize: "2rem",
      buttons: {
        textTransform: "none",
        borderRadius: "20px 0 20px 0",
        
fontSize: "1.5rem",
fontWeight: 700, 
      }
      
    },
    overrides: {
      MuiInputLabel: {
          root: {
              color: orange
          }
      } ,
      MuiSnackbarContent:{
root: {
  justifyContent: "center"
}
      },
      
      MuiInputBase: {
          input: {
              color: orange
          }
      },
  
    MuiOutlinedInput: {
        notchedOutline: {                          
            borderColor: turquiose
        },
        root: {
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
         
            borderColor: turquiose
          }
        
        }
      }  
        
    

    }
   
})
theme = responsiveFontSizes(theme);
export default theme;