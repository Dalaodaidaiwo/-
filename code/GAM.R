library(mgcv)
Data <- read.delim("fish.txt")
Data <- as.matrix(Data)
B<-Data[,1]
Q<-Data[,2]
Year<-Data[,3]
Tem<-Data[,4]
SSB<-Data[,5]
N<-Data[,6]
W<-Data[,7]
Z<-Data[,8]
result<-gam(log(Q) ~ s(B,k=3))
result1 <- gam(log(Q) ~ s(Tem,k=3)) 
result2<-gam(log(Q) ~ s(N,k=3))
result3 <- gam(log(Q) ~ s(W,k=3)) 
result4 <- gam(log(Q) ~ s(Year,k=3))
result5 <- gam(log(Q) ~ s(Z,k=3))
dev.off()
par(mfrow=c(3,2))
plot(result1,se=T,resid=T,pch=16)
plot(result2,se=T,resid=T,pch=16)
plot(result3,se=T,resid=T,pch=16)
plot(result,se=T,resid=T,pch=16)
plot(result4,se=T,resid=T,pch=16)
plot(result5,se=T,resid=T,pch=16)
summary(result1)
summary(result2)
summary(result3)
summary(result4)
summary(result)
summary(result5)
sink("AIC.txt")
AIC(result1,result2,result3,result,result4,result5)
sink()
sink("anova.txt")
anova.gam(result1,result2,result3,result4,result5,result,test = "Chisq")
sink()