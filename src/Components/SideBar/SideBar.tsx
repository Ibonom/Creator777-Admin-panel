import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HeadsetIcon from '@mui/icons-material/Headset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import ImageIcon from '@mui/icons-material/Image';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TagIcon from '@mui/icons-material/Tag';
import SettingsIcon from '@mui/icons-material/Settings';

import SideBarHandlerType from '../../Models/SideBarHandlerType';
import ListItemCustom from './ListItem/ListItem';

function SideBar({ sideBarState, sideBarHandler }: SideBarHandlerType) {
  return (
    <Box>
      <Drawer
        open={sideBarState}
        onClose={() => {
          sideBarHandler(false);
        }}
      >
        <Box
          onClick={() => {
            sideBarHandler(false);
          }}
        >
          <List>
            <ListItemCustom
              IconElement={HomeIcon}
              name="Home"
              urlAdress="/dashboard"
            />

            <ListItemCustom
              IconElement={MenuBookIcon}
              name="Menu"
              urlAdress="menu"
            />

            <ListItemCustom
              IconElement={TagIcon}
              name="Social Media"
              urlAdress="social-media"
            />

            <ListItemCustom
              IconElement={LanguageIcon}
              name="Pages"
              urlAdress="pages"
            />

            <ListItemCustom
              IconElement={BookTwoToneIcon}
              name="Blog"
              urlAdress="blog"
            />
            <ListItemCustom
              IconElement={HeadsetIcon}
              name="Podcast"
              urlAdress="podcast"
            />

            <ListItemCustom
              IconElement={ImageIcon}
              name="Gallery"
              urlAdress="gallery"
            />

            <ListItemCustom
              IconElement={AccountCircleIcon}
              name="Users"
              urlAdress="users"
            />

            <ListItemCustom
              IconElement={SettingsIcon}
              name="Settings"
              urlAdress="settings"
            />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideBar;
