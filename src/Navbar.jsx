import { Search, Notification, Bicycle } from "@carbon/icons-react";
import {
   Header,
   HeaderName,
   HeaderGlobalBar,
   HeaderGlobalAction,
} from "@carbon/react";

const Navbar = () => {
   return (
      <Header
         aria-label="IBM Platform Name"
         style={{ backgroundColor: "black" }}
      >
         <HeaderName href="#" style={{ color: "white" }}>
            Tacos
         </HeaderName>
         <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search">
               <Search size={20} color="white" style={{ fill: "white" }} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications">
               <Notification size={20} style={{ fill: "white" }} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="App Switcher">
               <Bicycle size={20} style={{ fill: "white" }} />
            </HeaderGlobalAction>
         </HeaderGlobalBar>
      </Header>
   );
};

export default Navbar;
