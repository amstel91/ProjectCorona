import { StyleSheet,ScrollView,Linking,RefreshControl } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-cards';
import CardImage from '../../components/card/reactNativeCardExt/CardImage'
import React, { Component } from 'react';
import Api from '../../api/Api'
import AppUtils from '../../utils/AppUtils'
import Share from 'react-native-share';
import Toaster, { ToastStyles } from 'react-native-toaster'

class NewsPage extends Component{

    shareOptions = {
        title: 'Share via',
        message: '',
        url: ''
    };

    constructor(props){
        super(props)
        this.state={
            articles:[],
            totalResults:0,
            refreshing:false,
            message:null
        }
    }

    translateToLocalDate(date){
        if(date && date.trim()!=""){
           let tDate=new Date(date);
           console.log("Date returned by API:",date)
           console.log("Date returned by API in Local Timezone:",tDate.toLocaleString())
           return AppUtils.getTimeSince(tDate);
        }
        return "";
     }

    onRefresh() {
        this.setState({refreshing: true});
        this.refreshNews();
    }

    share(article){
        this.shareOptions.url=article.url;
        this.shareOptions.message=article.title
        Share.open(this.shareOptions)
        .then((res) => { 
           let msg= { text: 'Shared successfully', styles: ToastStyles.success };
           this.setState({ message:msg });
         })
        .catch((err) => { err && console.log(err); });
    }

    refreshNews(){
        Api.getNews().then(res=>{
            console.log("Amstel",res);
            if(res.articles){
                this.setState(
                    {
                        articles:res.articles,
                        totalResults:res.totalResults,
                        refreshing: false
                    }
                )
            }else{
                let msg= { text: 'Could not load data. Please try again', styles: ToastStyles.error };
                this.setState({ message:msg });
            }
        }).catch((err)=>{
                let msg= { text: 'Could not load data. Please try again', styles: ToastStyles.error };
                this.setState({ message:msg });
        })
    }

    componentDidMount(){
        this.refreshNews();
    }

    loadInBrowser = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    generateCards(){
        let self=this;
        let cards=this.state.articles.map(function (card,index) {
            return (
                <Card key={index}>
                    <CardImage 
                    source={{uri: card.urlToImage}} 
                    title={card.title}
                    />
                    <CardTitle style={styles.cardTitle}
                    subtitle={self.translateToLocalDate(card.publishedAt)}
                    />
                    <CardContent text={card.description} />
                    <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <CardButton style={styles.button}
                        onPress={() => {self.share(card)}}
                        title="Share"
                        color="#00000"
                    />
                    <CardButton style={styles.button}
                        onPress={() => {self.loadInBrowser(card.url)}}
                        title="Explore"
                        color="#00000"
                    />
                    </CardAction>
                </Card>
            );
         });
        return (<ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)} />
                    }
                >
                    {cards}
                </ScrollView>)
    }

    render(){
        
        return(
            <>
                <Toaster message={this.state.message} />
                {this.generateCards()}
            </>
        )
    }
}

const styles = StyleSheet.create({
    cardTitle:{
        marginTop:-10
    },
    cardButton:{
        fontWeight:"bold"
    }
});

export default NewsPage;