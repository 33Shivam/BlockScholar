import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import styles from "../pages/css/nav.module.css";
import { useRouter } from "next/router";

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li className={styles.listItemsub}>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className={styles.ListItemHeading}>{title}</div>
          <p className={styles.ListItemText}>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

const NavigationMenuDemo = () => {
  const router = useRouter();

  return (
    <>
      <NavigationMenu.Root className={styles.NavigationMenuRoot}>
        <NavigationMenu.List className={styles.NavigationMenuList}>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className={styles.NavigationMenuLink}
              onClick={() => router.push("/index")}
            >
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              About <CaretDownIcon className={styles.CaretDown} aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ul className={styles.List_one}>
                <li style={{ gridRow: "span 3" }}>
                  <NavigationMenu.Link asChild>
                    <a className={styles.Callout} href="/">
                      <div className={styles.CalloutHeading}>BlockScholar</div>
                      <p className={styles.CalloutText}>
                        Unlocking the doors to education's future,We harnesses
                        blockchain innovation to redefine scholarship
                        accessibility and integrity.
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              Colleges{" "}
              <CaretDownIcon className={styles.CaretDown} aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ul className={styles.List_two}>
                <ListItem title="Delhi Technological University"></ListItem>
                <ListItem title="Netaji Subhas University of Technology"></ListItem>
                <ListItem title="Manipal Institute of Technology"></ListItem>
                <ListItem title="Lovely Professional University"></ListItem>
                <ListItem title="Guru Govind Singh Institute of Technology"></ListItem>
                <ListItem title="Vellore Instiute of Technology"></ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              Learn <CaretDownIcon className={styles.CaretDown} aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ul className={styles.List_two}>
                <ListItem title="Delhi Technological University"></ListItem>
                <ListItem title="Netaji Subhas University of Technology"></ListItem>
                <ListItem title="Manipal Institute of Technology"></ListItem>
                <ListItem title="Lovely Professional University"></ListItem>
                <ListItem title="Guru Govind Singh Institute of Technology"></ListItem>
                <ListItem title="Vellore Instiute of Technology"></ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className={styles.NavigationMenuIndicator}>
            <div className={styles.Arrow} />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className={styles.ViewportPosition}>
          <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
        </div>
      </NavigationMenu.Root>
    </>
  );
};
export default NavigationMenuDemo;
