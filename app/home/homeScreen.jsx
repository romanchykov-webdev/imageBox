import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    TouchableWithoutFeedbackBase, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Feather, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {theme} from "../../constants/theme";
import {hp, wp} from "../../helpers/common";
import Categories from "../../components/categories";
import {apiCall} from "../../api";
import ImageGrid from "../../components/imageGrid";

import {debounce} from 'lodash'
import LoaderStandard from "../../components/LoaderStandard";
import FiltersModal from "../../components/filtersModal";

var page = 1;

const HomeScreen = () => {

    const [loading, setLoading] = useState(false)

    const {top} = useSafeAreaInsets();

    const paddingTop = top > 0 ? top + 20 : 40;

    const [search, setSearch] = useState('')

    const searchInputRef = useRef(null);

    const [activeCategory, setActiveCategory] = useState(null)

    const [images, setImages] = useState([])

    const modalRef = useRef(null);

    const [filters, setFilters] = useState(null)

    const handleChangeCategory = (cat) => {
        setActiveCategory(cat);
        clearSearch()
        setImages([])
        page = 1;
        let params = {
            page,
            ...filters
        }
        if (cat) params.category = cat;
        fetchImages(params, false)
        // onChangeTextSearch(cat)
    }

    // console.log('active',activeCategory)


    useEffect(() => {
        fetchImages()
    }, []);

    const fetchImages = async (params = {page: 1}, append = true) => {
        setLoading(true)

        console.log('params', params, append)

        let res = await apiCall(params);

        if (res.success && res?.data?.hits) {

            if (append) {
                setImages([...images, ...res.data.hits]);
            } else {
                setImages([...res.data.hits]);
            }

        }
        setTimeout(() => {
            setLoading(false)
        }, 500)

        // console.log('got result',res.data);
        // console.log('got result',res.data.hits.length);
        // console.log('got result', JSON.stringify(res.data, null, 2));

    }


    // Вызывать handleTextDebounce только для отправки запроса, а не для обновления значения в TextInput
    const handleSearch = (text) => {

        if (text.length > 2) {
            // search for this text
            page = 1;
            setImages([])
            setActiveCategory(null)//clear category when search
            fetchImages({page, q: text, ...filters}, false)
        }

        if (text === '') {
            //result reset
            page = 1;
            searchInputRef?.current?.clear();
            setImages([])
            setActiveCategory(null)//clear category when search
            fetchImages({page, q: text, ...filters}, false)
        }

    };

    // Обертываем `handleSearch` в debounce
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    // Обработка изменения текста в поле
    const onChangeTextSearch = (text) => {
        setSearch(text);
        handleTextDebounce(text);  // Используем debounce для запроса
    };
    // Вызывать handleTextDebounce только для отправки запроса, а не для обновления значения в TextInput end


    const clearSearch = () => {
        setSearch("")
        searchInputRef?.current?.clear();
    }


    // modal

    const openFiltersModal = () => {
        modalRef?.current?.present()
    }
    const closeFiltersModal = () => {
        modalRef?.current?.close()
    }

    const applyFilters = () => {
        // console.log('apply filters')
        if (filters) {
            page = 1;
            setImages([])
            let params = {
                page,
                ...filters
            }

            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false);

        }


        closeFiltersModal()
    }

    const resetFilters = () => {

        if (filters) {
            page = 1;
            setFilters(null);
            setImages([]);
            let params = {
                page,
            }
            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false);
        }

        // console.log('reset filters')
        // setFilters(null)
        closeFiltersModal()
    }
    // console.log('filters', filters);
    // modal

    const closeThisFilter = (filterName) => {
        // console.log('closeThisFilter filterName', filterName)
        let filterNew = {...filters};

        delete filterNew[filterName]
        // console.log('closeThisFilter filterNew', filterNew)

        setFilters({...filterNew});

        page = 1;

        setImages([]);

        let params = {
            page,
            ...filterNew
        };

        if (activeCategory) params.category = activeCategory;

        if (search) params.q = search;

        fetchImages(params, false);

    }

    // function for scroll and get mo images

    const [isEndReached, setIsEndReached] = useState(false)

    const handleScroll = (event) => {

        const contentHeight = event.nativeEvent.contentSize.height;

        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

        const scrollOffset = event.nativeEvent.contentOffset.y;

        const bottomPosition = contentHeight - scrollViewHeight;

        if (scrollOffset >= bottomPosition - 1) {
            // console.log('reached the bottom of scrollView2')

            if (!isEndReached) {
                setIsEndReached(true) //так останавливаем многократный вызов
                console.log('reached the bottom of scrollView new')

                ++page;

                let params = {
                    page,
                    ...filters
                }

                if (activeCategory) params.category = activeCategory;

                if (search) params.q = search;

                fetchImages(params);

            }

        } else if (isEndReached) {
            setIsEndReached(false)
        }

        // console.log('scroll event fire1',contentHeight)
        // console.log('scroll event fire1',contentHeight)

    }

    const handleScrollUp = () => {
        scrollRef?.current?.scrollTo({
            y: 0,
            animated: true
        })
    }

    const scrollRef = useRef(null);

    // function for scroll and get mo images  end


    return (
        <View style={[styles.container, {paddingTop}]}>
            {/*    header   */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleScrollUp}
                >
                    <Text style={styles.title}>
                        <Text style={styles.textAccent}>I</Text>mage
                        <Text style={styles.textAccent}>B</Text>ox
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openFiltersModal}
                >
                    <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)}/>
                </TouchableOpacity>
            </View>

            {/*    body component   */}
            <ScrollView
                contentContainerStyle={{gap: 15}}
                style={styles.SVContainer}
                keyboardDismissMode="on-drag"  // Добавляем это свойство для скрытия клавиатуры

                onScroll={handleScroll}  //for get new image on scroll bottom
                scrollEventThrottle={5} //how often scroll event will fire whiel scrolling (in ms)
                ref={scrollRef}
            >
                {/*    search bar   */}
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>

                        <Feather name="search" size={24} color={theme.colors.neutral(0.4)}/>
                    </View>

                    <TextInput
                        placeholder="Search for Images"
                        placeholderTextColor={theme.colors.neutral(0.2)}
                        ref={searchInputRef}
                        style={styles.searchInput}
                        value={search}
                        onChangeText={onChangeTextSearch}
                    />
                    {
                        search && (
                            <TouchableOpacity
                                onPress={() => onChangeTextSearch("")}
                                style={styles.closeIcon}>
                                <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)}/>
                            </TouchableOpacity>
                        )
                    }


                </View>

                {/*    categories   */}
                <View style={styles.categoriesWrapper}>
                    <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
                </View>

                {/* filters*/}
                {
                    filters && (
                        <View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.filtersScrollView}
                            >
                                {
                                    Object.keys(filters).map((key, index) => {
                                        return (
                                            <View
                                                key={key}
                                                style={styles.filterItem}
                                            >
                                                {
                                                    key === 'colors'
                                                        ? (
                                                            <Text
                                                                style={[styles.filterItemText, {color: filters[key]}]}
                                                            >
                                                                {filters[key]}
                                                            </Text>
                                                        )
                                                        : (
                                                            <Text
                                                                style={styles.filterItemText}
                                                            >
                                                                {filters[key]}
                                                            </Text>
                                                        )
                                                }

                                                <TouchableOpacity
                                                    style={styles.filterCloseIcon}
                                                    onPress={() => closeThisFilter(key)}
                                                >
                                                    <Ionicons name="close" size={14} color={theme.colors.neutral(0.9)}/>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }

                            </ScrollView>
                        </View>
                    )
                }

                {/*    images Grid  */}
                {/*{*/}
                {/*    images.length > 0 && <ImageGrid images={images}/>*/}
                {/*}*/}
                <View>
                    {
                        // loading
                        //     ? (<LoaderStandard/>)
                        //     : (
                                images.length > 0 && <ImageGrid images={images}/>
                            // )
                    }
                </View>
                {/*loading new images */}
                <View style={{marginBottom: 70, marginTop: images.length > 0 ? 10 : 70}}>

                    <LoaderStandard/>

                </View>

            </ScrollView>

            {/*    filter modal */}
            <FiltersModal
                modalRef={modalRef}
                filters={filters}
                setFilters={setFilters}
                onClose={closeFiltersModal}
                onApply={applyFilters}
                onReset={resetFilters}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAccent: {
        color: theme.colors.accent,
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9),
    },
    SVContainer: {
        paddingHorizontal: wp(4),
        // height:'100%',
        // borderWidth:1,
        // borderColor:'red'
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        backgroundColor: theme.colors.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg,
    },
    searchIcon: {
        padding: 8
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(1.8)
    },
    closeIcon: {
        backgroundColor: theme.colors.neutral(0.1),
        padding: 8,
        borderRadius: theme.radius.sm
    },
    categoriesWrapper: {},
    filtersScrollView: {
        gap: 10,
    },
    filterItem: {
        backgroundColor: theme.colors.grayBG,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.radius.xs,
        gap: 10,
        paddingHorizontal: 10,
    },
    filterItemText: {
        fontSize: hp(1.9),
        textTransform: 'capitalize',
        fontWeight: theme.fontWeights.medium,
    },
    filterCloseIcon: {
        backgroundColor: theme.colors.neutral(0.2),
        padding: 4,
        borderRadius: 7
    }
})


export default HomeScreen;
