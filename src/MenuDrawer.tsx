import React from 'react';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import RadioIcon from '@mui/icons-material/Radio';
import SettingsIcon from '@mui/icons-material/Settings';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SaveIcon from '@mui/icons-material/Save';

import { ViewTypes } from './types';
import type { ViewType } from './types';

export default function MenuDrawer(props: { open?: boolean, onClose: () => void, onItemSelected: (selectedView: ViewType) => void }): JSX.Element {
  // メニューのボタンを押したときの処理
  const handleMenuButtonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const view = e.currentTarget.dataset.viewtype as ViewType;
    view && props.onItemSelected(view);
    props.onClose();
  };

  return (
    <Drawer open={ props.open } onClose={ props.onClose }>
      <List>
        <ListItem>
          <ListItemText primary='miraview' primaryTypographyProps={{ variant: 'h6', align: 'center' }} />
        </ListItem>
        <ListItem>
          <ListItemButton data-viewtype={ ViewTypes.Programs } onClick={ handleMenuButtonClick }>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary={ ViewTypes.Programs } />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton data-viewtype={ ViewTypes.Tuners } onClick={ handleMenuButtonClick }>
            <ListItemIcon>
              <RadioIcon />
            </ListItemIcon>
            <ListItemText primary={ ViewTypes.Tuners } />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton data-viewtype={ ViewTypes.Reserved } onClick={ handleMenuButtonClick }>
            <ListItemIcon>
              <AccessAlarmsIcon />
            </ListItemIcon>
            <ListItemText primary={ ViewTypes.Reserved } />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton data-viewtype={ ViewTypes.Recording } onClick={ handleMenuButtonClick }>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary={ ViewTypes.Recording } />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton data-viewtype={ ViewTypes.Recorded } onClick={ handleMenuButtonClick }>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary={ ViewTypes.Recorded } />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton data-viewtype={ ViewTypes.Config } onClick={ handleMenuButtonClick }>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={ ViewTypes.Config } />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
