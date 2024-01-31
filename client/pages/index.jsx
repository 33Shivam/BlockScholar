import React from "react";
import Background from "../public/Background.jpg";
import NavigationMenuDemo from "../components/nav";
import {
  Section,
  Container,
  Grid,
  Box,
  Heading,
  Flex,
  Text,
  Button,
} from "@radix-ui/themes";
import styles from "./css/index.module.css";
import img from "../public/imgHero.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.outlay1}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="402"
          height="342"
          viewBox="0 0 402 342"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M246.183 -104.329C312.639 -116.256 371.52 -62.0773 418.718 -13.7965C465.269 33.8225 509.63 92.4428 503.349 158.738C497.371 221.846 441.486 266.079 388.857 301.412C346.913 329.57 296.568 327.713 246.183 331.386C189.06 335.551 127.863 356.88 81.0708 323.851C29.1946 287.233 -8.32216 221.457 1.5951 158.738C10.9568 99.5328 85.3425 82.6114 126.157 38.7128C170.216 -8.67467 182.496 -92.898 246.183 -104.329Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <div className={styles.outlay2}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="422"
          height="389"
          viewBox="0 0 422 389"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M205.374 8.7358C261.752 10.383 323.63 -4.11215 366.368 32.694C410.935 71.0758 425.47 135.114 420.133 193.688C415.212 247.692 379.683 291.403 339.479 327.793C301.705 361.983 256.206 384.623 205.374 388.072C150.424 391.8 91.4587 385.477 51.7483 347.313C11.4882 308.621 6.04585 249.45 3.1127 193.688C-0.0469032 133.622 -9.70002 63.5939 34.6891 23.0034C78.4897 -17.0489 146.047 7.00245 205.374 8.7358Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <div className={styles.outlay3}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="763"
          height="616"
          viewBox="0 0 763 616"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M467.006 132.596C583.471 80.0015 685.35 -14.6835 812.005 2.3109C960.633 22.2536 1115.18 93.659 1181.01 228.4C1246.57 362.608 1189.14 518.749 1131.66 656.613C1079.22 782.362 998.913 894.871 877.418 956.524C755.024 1018.63 617.337 1011.37 482.441 986.056C317.591 955.124 116.62 945.835 36.1559 798.67C-45.1052 650.048 24.3375 458.696 116.336 316.471C190.857 201.265 341.959 189.067 467.006 132.596Z"
            fill="#EC9455"
          />
        </svg>
      </div>

      <div className={styles.outlay4}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="297"
          height="214"
          viewBox="0 0 297 214"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M61.3073 -30.9416C88.2219 -53.5969 123.623 -58.6072 158.797 -59.2766C190.998 -59.8894 224.821 -56.4651 248.377 -34.5015C271.085 -13.3285 270.217 20.1534 276.577 50.5425C284.477 88.2891 308.691 127.757 289.316 161.101C268.574 196.8 223.355 211.04 182.12 213.108C142.251 215.109 106.28 196.102 74.5541 171.875C40.7509 146.062 2.99212 116.646 0.220078 74.2049C-2.5263 32.1562 29.0695 -3.80563 61.3073 -30.9416Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <NavigationMenuDemo />
      <Section size="3" className={styles.section}>
        <Container size="4" className={styles.container}>
          <Flex
            display="flex"
            align="center"
            justify="between"
            className={styles.flex1}
          >
            <Flex display="flex" direction="column" gap="8">
              <Flex gap="4" direction="column">
                <Heading size="9">Secure and Transparent</Heading>
                <Heading size="8" weight="medium">
                  Scholarship distribution{" "}
                </Heading>{" "}
              </Flex>
              <Text size="4">
                Welcome to BlockScholar, where opportunity meets innovation in{" "}
                <br />
                the realm of education. We are pioneering a new era in
                scholarship <br />
                distribution, leveraging the power of blockchain technology to
                ensure <br />
                transparency, security, and accessibility for all.
              </Text>
              <Button
                size="3"
                style={{ maxWidth: "120px" }}
                onClick={() => router.push("/signin")}
              >
                Get Started
              </Button>
            </Flex>
            <Flex>
              {" "}
              <Image
                src={img}
                alt="GFG logo imported from public directory"
                className={styles.img}
              />{" "}
            </Flex>
          </Flex>
        </Container>
      </Section>
    </div>
  );
}

export default HomePage;
