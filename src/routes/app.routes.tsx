import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardRoute from "./Dashboard.routes";
import ClientSelection from "../screens/ClientSelection";
import UpdateUser from "../screens/UpdateUser";
import LogoutComponent from "../components/Logout";
import { CartProvider } from "../contexts/Cart";
import { ClientProvider } from "../contexts/Client";
import { CheckoutProvider } from "../contexts/Checkout";
import { useNavigation } from "@react-navigation/native";
import CheckoutRoutes from "./Checkout.routes";
import ProductOverview from "../screens/ProductOverview";
import CheckoutScreen from "../screens/CheckoutScreen";
import colors from "../config/colors";
import ClientContext from "../contexts/Client";

const AppStack = createStackNavigator();

const AppRoutes = () => {
  const clientContext = useContext(ClientContext);
  const [clientData, setClientData] = useState({
    name: "",
    id: 0,
    email: "",
  });
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  useEffect(() => {
    setClientData(clientContext.client);
  }, [clientContext.client]);
  return (
    <CartProvider>
      <ClientProvider>
        <AppStack.Navigator>
          <AppStack.Screen
            name="clientSelection"
            component={ClientSelection}
            options={{
              headerShown: false,
              headerLeft: undefined,
              title: "Seleção de estabelecimentos",
            }}
          />
          <AppStack.Screen
            name="dashboard"
            component={DashboardRoute}
            options={{
              title: `${clientData.name}`,
              headerRight: () => <LogoutComponent />,
              headerStyle: { backgroundColor: colors.HEADER_COLOR },
            }}
          />
          <AppStack.Screen
            name="updateUserScreen"
            component={UpdateUser}
            options={{
              title: "Atualização de dados do usuário",
              headerStyle: { backgroundColor: colors.HEADER_COLOR },
            }}
          />
          <AppStack.Screen
            name="ProductOverview"
            component={ProductOverview}
            options={{
              title: "Detalhe do produto",
              headerStyle: { backgroundColor: colors.HEADER_COLOR },
              cardStyleInterpolator: forFade,
              transitionSpec: {
                open: {
                  animation: "spring",
                  config: {
                    stiffness: 1000,
                    damping: 500,
                    mass: 3,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
                close: {
                  animation: "spring",
                  config: {
                    stiffness: 1000,
                    damping: 500,
                    mass: 3,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
              },
            }}
          />
          <AppStack.Screen
            name="Checkout"
            component={CheckoutRoutes}
            options={{
              headerStyle: { backgroundColor: colors.HEADER_COLOR },
            }}
          />
        </AppStack.Navigator>
      </ClientProvider>
    </CartProvider>
  );
};

export default AppRoutes;
