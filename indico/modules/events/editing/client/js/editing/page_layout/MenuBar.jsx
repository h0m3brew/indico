// This file is part of Indico.
// Copyright (C) 2002 - 2020 CERN
//
// Indico is free software; you can redistribute it and/or
// modify it under the terms of the MIT License; see the
// LICENSE file for more details.
import managementURL from 'indico-url:event_management.settings';
import displayURL from 'indico-url:events.display';
import editableTypeListURL from 'indico-url:event_editing.editable_type_list';

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Header, Icon, Menu} from 'semantic-ui-react';
import {Translate} from 'indico/react/i18n';
import Palette from 'indico/utils/palette';
import {EditableType, EditableEditingTitles} from '../../models';

import './MenuBar.module.scss';

function EditableListMenu({eventId, editableType}) {
  if (location.pathname === editableTypeListURL({confId: eventId, type: editableType})) {
    return (
      <Menu vertical>
        <Menu.Item active>
          <Translate>Editable list</Translate>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu vertical>
      <Menu.Item as={Link} to={editableTypeListURL({confId: eventId, type: editableType})}>
        <span style={{color: Palette.blue}}>
          <Translate>Editable list</Translate>
        </span>
      </Menu.Item>
    </Menu>
  );
}

EditableListMenu.propTypes = {
  eventId: PropTypes.number.isRequired,
  editableType: PropTypes.oneOf(Object.values(EditableType)).isRequired,
};

export default function MenuBar({eventId, menuItems, editableType}) {
  return (
    <div styleName="menu-bar">
      <Header as="h2" styleName="header">
        {EditableEditingTitles[editableType]}
      </Header>
      <EditableListMenu eventId={eventId} editableType={editableType} />
      <Menu vertical>
        <Menu.Item header>
          <span styleName="capitalized" style={{color: Palette.black}}>
            <Translate>other modules</Translate>
          </span>
        </Menu.Item>
        {menuItems.map(item => (
          <Menu.Item key={item.name} name={item.name} as="a" href={item.url}>
            <span style={{color: Palette.blue}}>
              {item.icon && <Icon name={item.icon.replace('icon-', '')} />}
              {item.title}
            </span>
          </Menu.Item>
        ))}
      </Menu>
      <Menu vertical>
        <Menu.Item header>
          <span styleName="capitalized" style={{color: Palette.black}}>
            <Translate>other views</Translate>
          </span>
        </Menu.Item>
        <Menu.Item name="display" as="a" href={displayURL({confId: eventId})}>
          <span style={{color: Palette.blue}}>
            <Icon name="tv" /> <Translate>Display</Translate>
          </span>
        </Menu.Item>
        <Menu.Item name="management" as="a" href={managementURL({confId: eventId})}>
          <span style={{color: Palette.blue}}>
            <Icon name="pencil" /> <Translate>Management</Translate>
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );
}

const menuEntryPropTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
MenuBar.propTypes = {
  eventId: PropTypes.number.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape(menuEntryPropTypes)).isRequired,
  editableType: PropTypes.oneOf(Object.values(EditableType)).isRequired,
};
