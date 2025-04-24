import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
const tabs = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "search", title: "Search", icon: icons.search },
    { name: "saved", title: "Saved", icon: icons.save },
    { name: "profile", title: "Profile", icon: icons.person },
  ];

const TabIcon = ({focused,icon,title}:any) => {
    if(focused){

        return (
            <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[112px]  min-h-16  mt-4 justify-center items-center rounded-full overflow-hidden"
            >
            <Image source={icon} className="size-5" tintColor="#FFFFFF" />
            <Text className="text-seconday text-base font-semibold ml-2 text-white">{title}</Text>
            </ImageBackground>
        );

    }
    else
    {
        return (
            <View className="size-full justify-center items-center mt-4 rounded-full overflow-hidden">
            <Image source={icon} tintColor="#A8B5DB" />
            </View>
        );

    }

}
const _layout = () => {
  return (
    <Tabs screenOptions = {{
        tabBarShowLabel: false,
        tabBarItemStyle :{
            width :'100%',
            height:"100%",
            justifyContent:'center',
            alignItems:'center',
          
        },
        tabBarStyle :{
            backgroundColor:"#0F0D23",
            borderRadius:50,
            marginHorizontal:20,
            marginBottom:36,
            height:52,
            overflow:'hidden',
            position:'absolute',
            borderWidth:1,
            borderColor:'0f0d23',
   

        }
    }}>
    {tabs.map(({ name, title, icon }) => (
      <Tabs.Screen
        key={name}
        name={name}
        options={{
          title,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icon} title={title} />
          ),
        }}
      />
    ))}
  </Tabs>
  );
};

export default _layout;
