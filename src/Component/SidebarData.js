import React from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Octicons } from 'react-native-vector-icons';

const SidebarData = [
  {
    titles: "Dashboard",
    icon: <Octicons name="home" size={24} color="#000" />,
    link: "Home"
  },
  {
    titles: "Reports",
    icon: <Octicons name="file" size={24} color="#000" />,
    link: "Reports"
  },
  {
    titles: "Settings",
    icon: <Octicons name="cog" size={24} color="#000" />,
    link: "Settings"
  },
  {
    titles: "Rate us",
    icon: <Octicons name="star" size={24} color="#000" />,
    link: "Rate"
  },
  {
    titles: "About SafeGuard",
    icon: <Octicons name="info-circle" size={24} color="#000" />,
    link: "About"
  },
];

export default SidebarData;
