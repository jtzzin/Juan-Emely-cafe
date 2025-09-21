import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={clsx("bg-slate-800 px-4 py-2 justify-center rounded-md h-12 transition-all duration-300 ease-in-out", {
        "bg-orange-500": isSelected,
      })}
      {...rest}
    >
      <Text className="text-white font-semibold text-sm">{title}</Text>
    </Pressable>
  );
}
