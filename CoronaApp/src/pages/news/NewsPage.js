import { StyleSheet,ScrollView,Linking,RefreshControl,RefreshControl } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
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
        shareOptions.url=article.url;
        shareOptions.message=article.title
        Share.open(options)
        .then((res) => { 
           let msg= { text: 'Shared successfully', styles: ToastStyles.success };
           this.setState({ message:msg });
         })
        .catch((err) => { err && console.log(err); });
    }

    refreshNews(){
        Api.getNews("us").then(res=>{
            console.log(res);
            this.setState(
                {
                    articles:res.articles,
                    totalResults:res.totalResults,
                    refreshing: false
                }
            )
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
        let cards=this.state.articles.map(function (card) {
            return (
                <Card>
                    <CardImage 
                    source={{uri: card.urlToImage}} 
                    title={card.title}
                    />
                    <CardTitle
                    subtitle={self.translateToLocalDate(card.publishedAt)}
                    />
                    <CardContent text={card.description} />
                    <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <CardButton
                        onPress={() => {}}
                        title="Share"
                        color="#FEB557"
                    />
                    <CardButton
                        onPress={self.loadInBrowser(card.url)}
                        title="Explore"
                        color="#FEB557"
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
 
});

export default NewsPage;