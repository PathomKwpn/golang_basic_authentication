import React from "react";
import { Box, Container, Flex, Tabs, Text } from "@radix-ui/themes";
const authPage = () => {
  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        maxWidth="600px"
        style={{ margin: "0 auto" }}
      >
        <Container size="1">
          <Tabs.Root
            defaultValue="signin"
            className="border-2 p-2 border-gray-200"
          >
            <Tabs.List
              size="1"
              justify="center"
              style={{
                display: "flex", // ใช้ Flex เพื่อควบคุมการกระจายตัว
                width: "100%", // ขยายเต็มความกว้าง
              }}
            >
              <Tabs.Trigger
                value="signin"
                style={{
                  flex: 1, // ให้แต่ละ Tab.Trigger มีขนาดเท่ากัน
                  textAlign: "center", // จัดตำแหน่งข้อความให้อยู่ตรงกลาง
                }}
              >
                Sign In
              </Tabs.Trigger>
              <Tabs.Trigger
                value="signup"
                style={{
                  flex: 1, // ขยายพื้นที่ให้เท่ากัน
                  textAlign: "center", // จัดข้อความให้อยู่กลาง Tab
                }}
              >
                Sign Up
              </Tabs.Trigger>
            </Tabs.List>
            <Box pt="3">
              <Tabs.Content value="signin">
                <Text size="2">Make changes to your account.</Text>
              </Tabs.Content>

              <Tabs.Content value="signup">
                <Text size="2">Access and update your documents.</Text>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Container>
      </Flex>
    </>
  );
};

export default authPage;
