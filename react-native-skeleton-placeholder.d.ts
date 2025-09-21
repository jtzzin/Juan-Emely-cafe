// react-native-skeleton-placeholder.d.ts

import { ComponentType } from "react";
import "react-native-skeleton-placeholder";

declare module "react-native-skeleton-placeholder" {
  interface SkeletonPlaceholderProps {
    /**
     * Componente de gradiente personalizado.
     * Usado para sobrescrever o padrão que tenta usar react-native-linear-gradient.
     */
    LinearGradientComponent?: ComponentType<any>;
  }
}
