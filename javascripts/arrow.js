
/**
 * ʵ������仭��ͷ�Ĺ���
 * @author mapleque@163.com
 * @version 1.0
 * @date 2013.05.23
 */
;(function(window,document){
 if (window.mapleque==undefined)
  window.mapleque={};
 if (window.mapleque.arrow!=undefined)
  return;
 
 /**
  * �������ӿ�
  */
 var proc={
  /**
  * ����canvas���󣬲��ڴ��ϻ���ͷ����ͷ��ֹ���Ѿ����ã�
  * @param context
  */
  paint:function(context){paint(this,context);},
  /**
  * ���ü�ͷ��ֹ��
  * @param sp���
  * @param ep�յ�
  * @param stǿ��
  */
  set:function(sp,ep,st){init(this,sp,ep,st);},
  /**
  * ���ü�ͷ���
  * @param args
  */
  setPara:function(args){
   this.size=args.arrow_size;//��ͷ��С
   this.sharp=args.arrow_sharp;//��ͷ���
  }
 };
 
 var init=function(a,sp,ep,st){
  a.sp=sp;//���
  a.ep=ep;//�յ�
  a.st=st;//ǿ��
 };
 var paint=function(a,context){
  var sp=a.sp;
  var ep=a.ep;
  if (context==undefined)
   return;
  //����ͷ����
  context.beginPath();
  context.moveTo(sp.x,sp.y);
  context.lineTo(ep.x,ep.y);
  //����ͷͷ��
  var h=_calcH(a,sp,ep,context);
  context.moveTo(ep.x,ep.y);
  context.lineTo(h.h1.x,h.h1.y);
  context.moveTo(ep.x,ep.y);
  context.lineTo(h.h2.x,h.h2.y);
  context.stroke();
 };
 //����ͷ������
 var _calcH=function(a,sp,ep,context){
  var theta=Math.atan((ep.x-sp.x)/(ep.y-sp.y));
  var cep=_scrollXOY(ep,-theta);
  var csp=_scrollXOY(sp,-theta);
  var ch1={x:0,y:0};
  var ch2={x:0,y:0};
  var l=cep.y-csp.y;
  ch1.x=cep.x+l*(a.sharp||0.025);
  ch1.y=cep.y-l*(a.size||0.05);
  ch2.x=cep.x-l*(a.sharp||0.025);
  ch2.y=cep.y-l*(a.size||0.05);
  var h1=_scrollXOY(ch1,theta);
  var h2=_scrollXOY(ch2,theta);
  return {
   h1:h1,
   h2:h2
    };
 };
 //��ת����
 var _scrollXOY=function(p,theta){
  return {
   x:p.x*Math.cos(theta)+p.y*Math.sin(theta),
   y:p.y*Math.cos(theta)-p.x*Math.sin(theta)
  };
 };
 
 var arrow=new Function();
 arrow.prototype=proc;
 window.mapleque.arrow=arrow;
})(window,document);
