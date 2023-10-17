import {
    Box,
    Button,
    Flex,
    Grid,
    Badge,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Td,
    Image,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    Link,
    Stack,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Menu,
    MenuButton,
    MenuList,
    MenuItem, Container, FormControl, Spinner
} from "@chakra-ui/react";
import {SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {Card, CardHeading, CustomBadge, NFTCustomCard} from '../../assets/StyledComponent/styeledComponent';
import Avatar from '../../assets/images/avatar.png';
import {ArtistListing} from "../index";
import moment from "moment";
import Dummy from '../../assets/images/dummy2.png'
import React , { useState,useEffect }  from "react";
import CryptoJS from 'crypto-js';
import server from "../../apis/server";
import { navigate} from "@reach/router";
import { LoadingScreen } from "../../components";
import ReactPaginate from 'react-paginate';
function ArtistSales(props) {
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""
    console.log('userTypeeee',userType)
    const userId=userType?._id
    const userName=userType?.name
    const [loader,setLoader]=useState(true);
    const [spin,setSpinner]=useState(true);

    const [offers,setOffers]=useState([]);
    const [completed,setCompleted]=useState([]);
    const [canceled,setCanceled]=useState([]);
    
    const itemsPerPage=4
    
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);



   

    useEffect(async () => {
        setLoader(true);
        await loadArtistSales();
        setLoader(false);
         },[itemOffset, itemsPerPage]);

    


    const loadArtistSales = async() => {
        setSpinner(true)
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/users/artist_sale",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
            console.log("data112: ",r.data.data);
            setCompleted(r.data.data);
            const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(r?.data?.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(r?.data?.data.length / itemsPerPage));
            setSpinner(false)

            
            setSpinner(false)
            
           }).catch(e=>console.log(e))
           
    }



















    const loadSales = async() => {
        setSpinner(true)
        
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/offer/getOfferByGallery",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
            console.log("data112: ",r.data.data);
            console.log("data1111: ",r.data.data.filter(val=>val?.tx_status=="pending"))
            setOffers(r?.data?.data.filter(val=>val?.tx_status=="confirmed"));
    //         const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(r?.data?.data.filter(val=>val?.tx_status=="confirmed").slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(r?.data?.data.filter(val=>val?.tx_status=="confirmed").length / itemsPerPage));
            setSpinner(false)
            
           }).catch(e=>console.log(e))
           
    }
    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % offers.length;
    //     console.log(
    //       `User requested page number ${event.selected}, which is offset ${newOffset}`
    //     );
    //     setItemOffset(newOffset);
    //   };
      const handlePageClick1 = (event) => {
        const newOffset = (event.selected * itemsPerPage) % completed.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
    //   const handlePageClick2 = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % canceled.length;
    //     console.log(
    //       `User requested page number ${event.selected}, which is offset ${newOffset}`
    //     );
    //     setItemOffset(newOffset);
    //   };

    const loadCompleted = async() => {
        setSpinner(true)
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/nft/SalesByGallery",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
               console.log(r.data.data)
            setCompleted(r.data.data);
            const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(r?.data?.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(r?.data?.data.length / itemsPerPage));
            setSpinner(false)
           }).catch(e=>console.log(e))
    }


    const loadCanceled = async() => {
        setSpinner(true)
        console.log(userId)
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/nft/CanceledByGallery",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
            console.log(r.data)
            setCanceled(r.data.data);
    //         const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(r?.data?.data.slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(r?.data?.data.length / itemsPerPage));
            setSpinner(false)
           }).catch(e=>console.log(e))

    }

    

    if(loader)
    {
      return (
        <Box height='100vh' display='flex'>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#0C0B86'
        size='xl'
        margin='auto'
    
        /></Box>
      )
    }

    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'}  p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'}  bg={'#fff'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                        <Box mr={'auto'}  flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px">Sales</Heading>
                        </Box>
                    </Flex>
                    <Heading mt={'64px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>{userName}'s NFT sales</Heading>
                </Box>
                {!offers?.length&&!completed?.length&&!canceled?.length?
                <Box as='section'  className='Login' borderTop={'1px solid #BCBCBC'}>
                    <Flex>
                        <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column"  >
                            <Box mb={'2.5rem'}  className="Box-card" p='1.5rem' bg='#F7F7F7' mt={'80px'} borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                <FormControl>
                                    <Icon width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                        <path d="M22.8998 14.1L32.7988 15.515L34.2128 25.415L25.0208 34.607C24.8333 34.7944 24.579 34.8998 24.3138 34.8998C24.0487 34.8998 23.7944 34.7944 23.6068 34.607L13.7068 24.707C13.5194 24.5194 13.4141 24.2651 13.4141 24C13.4141 23.7348 13.5194 23.4805 13.7068 23.293L22.8998 14.1ZM25.7278 22.586C25.9136 22.7717 26.1341 22.9189 26.3768 23.0194C26.6195 23.1199 26.8796 23.1716 27.1422 23.1715C27.4049 23.1715 27.6649 23.1197 27.9076 23.0191C28.1502 22.9186 28.3707 22.7712 28.5563 22.5855C28.742 22.3997 28.8893 22.1792 28.9898 21.9365C29.0903 21.6939 29.1419 21.4338 29.1419 21.1711C29.1419 20.9085 29.0901 20.6484 28.9895 20.4058C28.889 20.1631 28.7416 19.9427 28.5558 19.757C28.3701 19.5713 28.1496 19.424 27.9069 19.3235C27.6642 19.2231 27.4041 19.1714 27.1415 19.1714C26.611 19.1715 26.1024 19.3823 25.7273 19.7575C25.3523 20.1326 25.1417 20.6414 25.1418 21.1718C25.1419 21.7023 25.3527 22.211 25.7278 22.586Z" fill="#795E00"/>
                                    </Icon>
                                    <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >
                                        No NFTs sales
                                        
                                        
                                        </Text>
                                    <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >  
                                    Your Gallery hasn’t sold any of your NFTs yet.

                                     </Text>
                                </FormControl>
                            </Box>
                        </Container>
                    </Flex>
                </Box>:

                <Box h={'100%'} px={'24px'}>
                        <Tabs>
                            <TabList   >
                            </TabList>
                            <TabPanels  h={'100%'} mb={10}>
                                <TabPanel  p={0} color={'#000'} h={'100%'} py={6}>
                                    
                                {spin==false?
                                        completed?.length?
                                        <>
                                    <Box overflowX={"auto"}>
                                        
                                        <Table
                                            borderWidth="1px"
                                            borderCollapse={"separate"}
                                            borderSpacing={"0"}
                                            p={0}
                                            mb={'40px'}
                                            minW={'800px'}
                                        >
                                            <Thead bg={'#F7F7F7'}>
                                                <Tr >
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'28%'}>COLLECTOR</Th>
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'19%%'}>NFT</Th>
                                                    <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'19%'}>SALE PRICE</Th>
                                                    {/* <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'19%'}>PURCHASE OPTION</Th> */}
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'15%'}></Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>

                                            { completed?.map(offer=>(
                                                        <Tr mb="0"  borderWidth="1px">
                                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                                <Flex alignItems={'center'}>
                                                                    <Image src={`https://api.dadavault.com/api/users/artist_profile/${offer?.collector?.collector_profile_image}`} width={'48px'} height={'48px'} borderRadius={'50px'}  />
                                                                    <Box pl={'1rem'}>
                                                                        <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} wordBreak={'break-word'} >{offer?.collector?.name}</Text>
                                                                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'} wordBreak={'break-word'} >{offer?.collector?.email}</Text>
                                                                    </Box>
                                                                </Flex>
                                                            </Td>

                                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'14px'} fontWeight={"500"} >
                                                            <Link onClick={()=>{
                                                                  navigate(`/NFTsDetailNew/${offer?.artist_artwork?._id}`)
                                                              }}>
                                                                 {offer?.artist_artwork?.title}
                                                                </Link>
                                                            </Td>  <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                                {offer?.purchase_option=="buy" ? offer?.sale_price : offer?.offered_price} ETH
                                                            </Td>
                                                            
                                                            <Td textAlign={'end'}>
                                                                <Link  color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} onClick={()=>navigate("/ArtistSaleDetail",{ state: {offerId:offer?._id }})} >View details</Link>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                    }
                                            </Tbody>
                                        </Table>
                                    </Box>
                                        <Box display={'flex'} alignItems={'center'} >
                                            <Text color={'#8F8F8F'}>{completed.length} sales</Text>
                                            <Box ml={'auto'}>
                                                {/* <Button  color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'} mr={2} >Previous</Button>
                                                <Button  color={"#8F8F8F"} background={'none'}  fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"}  border={'1px solid #D2D2D2'}>Next</Button> */}
                                                <Box ml={'auto'} className={'newPaginations'}>
                                                <ReactPaginate
                                                breakLabel="..."
                                                nextLabel="Next "
                                                onPageChange={handlePageClick1}
                                                pageRangeDisplayed={5}
                                                pageCount={pageCount}
                                                previousLabel=" Previous"
                                                pageClassName="Mypage-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"

                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                containerClassName="pagination"
                                                activeClassName="active"
                                                renderOnZeroPageCount={null}
                                              />
                                                </Box>
                                            </Box>

                                        </Box>
                                        </>
                                        :"no record":<Box height='100%' width='100%' minH='80vh' display='flex'>
                                        <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#0C0B86'
                                        size='xl'
                                        margin='auto'
                                    
                                        />
                                        </Box>}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>}
                </Box>
        </>

    );
}

export default ArtistSales;
