%建立符号变量a(发展系数)和b(灰作用量)
syms a b;
c = [a b]';

%原始数列 A
A = [87016, 81784, 76089, 74558,81772, 74194];
n = length(A);

%对原始数列 A 做累加得到数列 B
B = cumsum(A);

%对数列 B 做紧邻均值生成
for i = 2:n
    C(i) = (B(i) + B(i - 1))/2; 
end
C(1) = [];

%构造数据矩阵 
B = [-C;ones(1,n-1)];
Y = A; Y(1) = []; Y = Y';

%使用最小二乘法计算参数 a(发展系数)和b(灰作用量)
c = inv(B*B')*B*Y;
c = c';
a = c(1); b = c(2);

%预测后续数据
F = []; F(1) = A(1);
for i = 2:(n+14)
    F(i) = (A(1)-b/a)/exp(a*(i-1))+ b/a;
end

%对数列 F 累减还原,得到预测出的数据
G = []; G(1) = A(1);
for i = 2:(n+14)
    G(i) = F(i) - F(i-1); %得到预测出来的数据
end

disp('预测数据为：');
G

%模型检验

H = G(1:6);
%计算残差序列
epsilon = A - H;

%法一：相对残差Q检验
%计算相对误差序列
delta = abs(epsilon./A);
%计算相对误差Q
disp('相对残差Q检验：')
Q = mean(delta)

%法二：方差比C检验
disp('方差比C检验：')
C = std(epsilon, 1)/std(A, 1)

%法三：小误差概率P检验
S1 = std(A, 1);
tmp = find(abs(epsilon - mean(epsilon))< 0.6745 * S1);
disp('小误差概率P检验：')
P = length(tmp)/n

%绘制曲线图
t1 = 2011:11:2066;
t2 = 2011:4:2087;

plot(t1, A,'ro'); hold on;
plot(t2, G, 'g-');
xlabel('年份'); ylabel('移民人数/人');
legend('实际人数','预测人数');
title('中美移民人数');
grid on;




clc,clear

clc,clear

x0=[20, 178, 175, 178, 193.9, 193.9]';%注意这里为列向量

n=length(x0);

lamda=x0(1:n-1)./x0(2:n) %计算级比

range=minmax(lamda') %计算级比的范围

x1=cumsum(x0); %累加运算

B=[-0.5*(x1(1:n-1)+x1(2:n)),ones(n-1,1)];

Y=x0(2:n);

u=B\Y

syms x(t)

x=dsolve(diff(x)+u(1)*x==u(2),x(0)==x0(1));%求微分方程的符号解

xt=vpa(x,6)%以小数格式显示微分方程的解

yuce1=subs(x,t,[0:n+70]);%式1 为提高预测精度，先计算预测值，再显示微分方程的解。%%%这里，把[0:n-1]修改就可以了，如果预测后5年的，就改成n+4。

yuce1=double(yuce1);% 符号数转换成数值类型，否则无法做差分运算

yuce=[x0(1),diff(yuce1)] %差分运算，还原数据

yuce2=subs(x,t,[0:n+4]);%为提高预测精度，先计算预测值，再显示微分方程的解。

Yuce2=double(yuce2);%符号数转换成数值类型，否则无法做差分运算

yucexin=[x0(1),diff(yuce2)] %差分运算，还原数

%【直接把式1 总n-1修改，运算会提示错误，但是不影响，如果想消除错误提示，可以添加黄色区域的，计算出两个结果，一个结果是不预测的一个结果是预测的。】

epsilon=x0'-yuce %计算残差

delta=abs(epsilon./x0') %计算相对误差

rho=1-(1-0.5*u(1))/(1+0.5*u(1))*lamda' %计算级比偏差值




