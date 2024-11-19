import React from 'react';
import { View, Image, SafeAreaView, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import { getImageForWeather, weatherImages } from '../constants';
import * as Progress from 'react-native-progress';
const HomeView = ({
    showSearch,
    toggleSearch,
    locations,
    handleTextDebounce,
    handleLocation,
    weather,
    loading
}) => {
    const { current, location } = weather;

    return (
        <View className="flex-1 relative">

            <StatusBar style='light' />
            <Image blurRadius={60} source={require('../assets/images/bg.png')} className='absolute h-full w-full' />
            {
                loading ? (
                    <View className="flex-1 flex-row justify-center items-center">
                        <Progress.CircleSnail thickness={5} size={60} color={'white'}></Progress.CircleSnail>
                    </View>
                ) : (
                    <SafeAreaView className="flex flex-1">
                        <View className="mx-4 mt-12 relative z-50">
                            <View className="flex-row justify-end items-center rounded-full"
                                style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                                {
                                    showSearch ? (
                                        <TextInput
                                            onChangeText={handleTextDebounce}
                                            placeholder='Search city'
                                            placeholderTextColor={'lightgray'}
                                            className="pl-6 h-10 flex-1 text-base text-white"
                                        />
                                    ) : null}

                                <TouchableOpacity
                                    style={{ backgroundColor: theme.bgWhite(0.3) }}
                                    className="rounded-full p-3 m-1"
                                    onPress={() => toggleSearch(!showSearch)}
                                >
                                    <AntDesign name="search1" size={20} color={'white'} />
                                </TouchableOpacity>
                            </View>
                            {
                                locations.length > 0 && showSearch ? (
                                    <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                                        {locations.map((loc, index) => {
                                            let showBorder = index + 1 != locations.length;
                                            let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : '';
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    className={"flex-row items-center border-0 p-3 px-4 mb-1" + borderClass}
                                                    onPress={() => handleLocation(loc)}
                                                >
                                                    <Ionicons name="location" size={25} color={'gray'}></Ionicons>
                                                    <Text className="text-black text-base ml-2">{loc?.name}, {loc?.country}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                ) : null
                            }
                        </View>
                        <View className="mx-4 flex justify-around flex-1 mb-2">
                            <Text className="text-white text-center text-2xl font-bold">{location?.name},
                                <Text className="text-lg font-normal text-gray-300"> {location?.country}</Text>
                            </Text>
                            <View className="flex-row justify-center">
                                <Image className="w-52 h-52" source={getImageForWeather(current?.condition?.text)}></Image>
                            </View>
                            <View className="space-y-2">
                                <Text className="text-center text-6xl text-white font-bold ml-2">{current?.temp_c}&#176;</Text>
                                <Text className="text-center text-2xl text-white font-normal tracking-widest"> {current?.condition?.text}</Text>
                            </View>
                            <View className="flex-row justify-between mx-4">
                                <View className="flex-row space-x-2 items-center">
                                    <Image className="w-6 h-6" source={require('../assets/icons/wind.png')}></Image>
                                    <Text className="text-white text-base font-semibold">{current?.wind_kph} km/h</Text>
                                </View>
                                <View className="flex-row space-x-2 items-center">
                                    <Image className="w-6 h-6" source={require('../assets/icons/drop.png')}></Image>
                                    <Text className="text-white text-base font-semibold">{current?.humidity}%</Text>
                                </View>
                                <View className="flex-row space-x-2 items-center">
                                    <Image className="w-8 h-8" source={require('../assets/icons/uv.png')}></Image>
                                    <Text className="text-white text-base font-semibold">{current?.uv}</Text>
                                </View>
                            </View>
                            <View className="space-y-3 mb-2">
                                <View className="flex-row items-center space-x-2 mx-3">
                                    <AntDesign name="calendar" size={20} color={'white'}></AntDesign>
                                    <Text className="text-white text-base">Daily forecast</Text>
                                </View>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    showsHorizontalScrollIndicator={false}>
                                    {
                                        weather?.forecast?.forecastday?.map((item, index) => {
                                            let date = new Date(item.date);
                                            let options = { weekday: 'long' };
                                            let dayName = date.toLocaleDateString('en-US', options);
                                            dayName = dayName.split(',')[0]
                                            return (
                                                <View key={index}
                                                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                                    style={{ backgroundColor: theme.bgWhite(0.2) }}>
                                                    <Image className="w-11 h-11" source={getImageForWeather(item?.day?.condition?.text)}></Image>
                                                    <Text className="text-white">{dayName}</Text>
                                                    <Text className="text-white text-xl font-semibold">{item.day.avgtemp_c}&#176;</Text>
                                                </View>
                                            )
                                        })
                                    }


                                </ScrollView>
                            </View>
                        </View>

                    </SafeAreaView>
                )
            }

        </View>
    );
};

export default HomeView;