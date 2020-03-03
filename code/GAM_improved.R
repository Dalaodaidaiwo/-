library(mgcv)
Data <- read.delim("fish.txt")
Data <- as.matrix(Data)
B<-Data[,1]
Q<-Data[,2]
Tem<-Data[,4]
SSB<-Data[,5]
N<-Data[,6]
W<-Data[,7]
result1 <- gam(log(Q) ~ SSB+s(W,k=3)+s(N,k=3)+s(Tem,k=3))
summary(result1)
plot(result1,se=T,resid=T,pch=16)