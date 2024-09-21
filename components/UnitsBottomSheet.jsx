import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { COLORS, FONTS } from "../constants";
import { useSettingsStore } from "../store";

const units = ["standard", "metric", "imperial"];
const UnitsBottomSheet = React.forwardRef(({}, ref) => {
  const snapPoints = React.useMemo(() => ["30%"], []);
  const { settings, update } = useSettingsStore();

  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: COLORS.gray,
      }}
      ref={ref}
      snapPoints={snapPoints}
      enableOverDrag={false}
      enableDynamicSizing={false}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 20,
            }}
          >
            Change Units
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
            }}
          >
            Change units of measurement.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <FlatList
            horizontal
            data={units}
            keyExtractor={(item) => item}
            style={{ gap: 5 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  update({ units: item });
                }}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  marginRight: 5,
                  borderRadius: 999,
                  width: 100,
                  alignItems: "center",
                  borderColor: COLORS.green,
                  backgroundColor:
                    settings?.units === item ? COLORS.green : COLORS.white,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    color:
                      settings?.units === item ? COLORS.white : COLORS.black,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default UnitsBottomSheet;
