import React, { useState, ReactNode } from "react";
import { Icon } from "@iconify/react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  BoxProps,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
} from "@mui/material";
import palette from "../theme/palette";

interface ListItemStyleProps extends ListItemButtonProps {
  component?: ReactNode;
  to?: string;
}

// ----------------------------------------------------------------------

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

type NavItemProps = {
  title: string;
  icon: JSX.Element;
  path: string;
  info?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
};

function NavItem({
  item,
  isShow,
}: {
  item: NavItemProps;
  isShow?: boolean | undefined;
}) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { title, path, icon, info, children } = item;
  const isActiveRoot = path
    ? !!matchPath({ path, end: false }, pathname)
    : false;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: palette.dark.text.secondary,
    fontWeight: "fontWeightMedium",
  };

  const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(
    ({ theme }) => ({
      ...theme.typography.body2,
      height: 48,
      position: "relative",
      textTransform: "capitalize",
      paddingLeft: theme.spacing(isShow ? 5.5 : 4.5),
      color: isShow ? palette.dark.text.secondary : palette.dark.text.primary,
      "&:before": {
        top: 0,
        right: 0,
        width: 3,
        bottom: 0,
        content: "''",
        display: "none",
        position: "absolute",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: theme.palette.primary.main,
      },
    })
  );

  if (children) {
    return (
      <React.Fragment>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path } = item;
                const isActiveSub = path
                  ? !!matchPath({ path, end: false }, pathname)
                  : false;
                return (
                  <ListItemStyle
                    key={title}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

interface NavConfig {
  subheader: string;
  icon?: JSX.Element;
  items: NavItemProps[];
  isShow?: boolean | undefined;
}

function NavHeader({
  items,
  subheader,
  icon,
  isShow = true,
  ...other
}: NavConfig) {
  const { pathname } = useLocation();

  const isActiveRoot: boolean = items.some((item) => {
    const { path } = item;
    return path ? !!matchPath({ path, end: false }, pathname) : false;
  });

  const [isOpen, setIsOpen] = useState(isActiveRoot);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // ----------------------------------------------------------------------
  const ListSubheader = styled(ListItemButton)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    color: palette.dark.text.primary,
  }));

  const ListSubheaderText = styled(ListItemText)(({ theme }) => ({
    ...theme.typography.overline,
    color: palette.dark.text.primary,
  }));

  const ListExpandLessButton = styled((props) => <ExpandLess {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontSize: theme.typography.pxToRem(16),
      color: palette.dark.text.primary,
    })
  );

  const ListExpandMoreButton = styled((props) => <ExpandMore {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontSize: theme.typography.pxToRem(16),
      color: palette.dark.text.primary,
    })
  );

  const theme = useTheme();
  return (
    <List component="div">
      {isShow && (
        <ListSubheader onClick={handleClick}>
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListSubheaderText
            primary={subheader}
            primaryTypographyProps={theme.typography.overline}
          />
          {isOpen ? <ListExpandLessButton /> : <ListExpandMoreButton />}
        </ListSubheader>
      )}
      {(isOpen || !isShow) &&
        items.map((item: NavItemProps) => (
          <NavItem key={item.title} item={item} isShow={isShow} />
        ))}
    </List>
  );
}

interface NavSectionProps extends BoxProps {
  isShow?: boolean | undefined;
  navConfig: NavConfig[];
}

export default function NavSection({
  navConfig,
  isShow = true,
  ...other
}: NavSectionProps) {
  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader } = list;
        return <NavHeader key={subheader} isShow={isShow} {...list} />;
      })}
    </Box>
  );
}
