import { useCallback } from "react";
import { View, Text, Button, Image } from "@/zero/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import logo from "./hook.png";
import { guid } from "@/zero/utils";
import "./index.less";
import Taro, { useReady, useRouter } from "@tarojs/taro";

const Index = () => {
  const router = useRouter();
  useReady(() => {
    console.log("router, wx", router, wx);
  });

  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);

  return (
    <View className="wrapper">
      <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro!
        {guid()}
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle("Taro Hooks Nice!")}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
      <Button
        className="button"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/common/outer/index"
          });
        }}
      >
        打开百度
      </Button>
      <Button
        className="button"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/calculator/house/index/index"
          });
        }}
      >
        购房计算器
      </Button>
    </View>
  );
};

export default Index;
