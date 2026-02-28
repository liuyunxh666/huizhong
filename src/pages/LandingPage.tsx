import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { 
  Mic2, 
  Cpu, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  Phone, 
  MapPin, 
  Play,
  Zap,
  Shield,
  Award,
  Headphones,
  FileCheck,
  DollarSign,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/db/supabase';


// --- Helper Components ---

const Counter = ({ value }: { value: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, numericValue, {
        duration: 2,
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  return (
    <span>
      <span ref={nodeRef}>0</span>
      {suffix}
    </span>
  );
};

const AIVoicePreview = () => {
  const [text, setText] = useState("您好，我是声音玩家AI配音，很高兴能为您服务。我们的音色具有极其真实的情感表现力。");
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState("male-qn-qingse");
  const [emotion, setEmotion] = useState("happy");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async (selectedVoice?: string, selectedEmotion?: string) => {
    if (!text) return;
    const v = selectedVoice || voice;
    const e = selectedEmotion || emotion;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice_id: v, emotion: e }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Convert hex to binary
      const hex = data.data.audio;
      const binary = new Uint8Array(hex.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16)));
      const blob = new Blob([binary], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      console.error("Generate error:", err);
      alert("生成失败: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card border-none shadow-xl overflow-hidden max-w-2xl mx-auto mt-12 mb-20">

    </Card>
  );
};


// --- Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl py-2 shadow-sm border-b border-black/[0.08]' : 'bg-transparent py-4 border-b border-black/[0.03]'
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Centered Logo */}
        <div className="flex items-center justify-center mb-2">
          <div className="w-[180px] h-[60px] md:w-[300px] md:h-[100px] from-primary to-secondary rounded-lg flex items-center justify-center bg-inherit bg-contain bg-center bg-no-repeat bg-[url(https://miaoda-edit-image.cdn.bcebos.com/9v6jfa2xcxz5/IMG-9v8av8av3h1c.png)] transition-all duration-300"></div>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center justify-center gap-4 md:gap-10 text-[11px] md:text-sm font-bold text-muted-foreground overflow-x-auto max-w-full">
          {['真情感AI配音', '真人配音', '声音克隆', '关于我们'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(`section-${index}`)}
              className="hover:text-primary transition-all duration-300 relative group cursor-pointer whitespace-nowrap pb-1"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-white to-background">
      {/* Particle Background Animation */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {/* Small floating particles */}
        <div className="absolute inset-0 z-0 overflow-hidden"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-5xl mx-auto px-4">
        <motion.h1 
          className="font-black mb-4 md:mb-8 tracking-tighter flex flex-col md:flex-row justify-center items-center gap-y-1 md:gap-x-4 -mt-[100px] md:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="gradient-text font-sans text-center text-[48px] md:text-[70px] leading-tight">{"「声音玩家」"}</span>
          <span className="gradient-text font-sans text-center text-[48px] md:text-[70px] leading-tight">{"让声音更鲜活"}</span>
        </motion.h1>
        <motion.p 
          className="mb-8 md:mb-12 max-w-3xl font-medium text-center text-[14px] md:text-[20px] leading-relaxed px-4 text-[#202023cc] md:text-[#202023cc]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >{"先进的语音配音服务平台，融合尖端AI技术与顶级真人配音，赋予声音无限生命力"}</motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center w-full"
        >
          <Button size="lg" className="rounded-full px-8 md:px-10 h-12 md:h-14 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 group">{"立即体验"}</Button>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center items-center pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="frosted-icon w-12 h-12 bg-gradient-to-br from-primary/80 to-secondary/80">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </motion.div>
    </section>
  );
};

// Section 0: AI Dubbing
const AIDubbingSection = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-400",
      title: "独家深度开发音色库",
      description: "专业的语音工程师精细化开发数十种soundvast独家音色库，每个音色千锤百炼，深度调教润色，让音色更贴合各类运用场景，更具天然质感。"
    },
    {
      icon: <Mic2 className="w-8 h-8" />,
      color: "from-purple-400 to-pink-400",
      title: "AI真情感配音",
      description: "采用先进的AI大模型和深度学习算法实现多情绪、多语态、全可控生产流程，从开篇-正文-结尾都有非常精细的情感表达，无论是对段落起伏和节奏把控还是多音字、停顿、重读、局部变速均有独到处理，解决了AI配音在情绪语调上的行业痛点，真正实现真情感AI配音。"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      color: "from-emerald-400 to-teal-400",
      title: "专业人工剪辑校对",
      description: "每一条AI配音都采用专业人工精剪+二次校对全流程服务，告别普通AI配音网站语音错误百出、来回抽卡、输出费时费力，我们通过专业人工剪辑校对后交付的AI配音成品，您到手即可使用，省心省力。"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      color: "from-orange-400 to-amber-400",
      title: "合法合规、版权溯源",
      description: "我们在生成式AI音频领域，主动做到：音色有授权、用户有权利、生成可溯源。音色均有线下或线上签署的【采集制作合同】、【数字音色经纪合同】、【音色使用授权书】等必备法律文书，所有音色均合法合规可商用。所有交付成品均有音频数字化水印，实现版权信息深度绑定溯源，从源头杜绝二次非商业授权使用。"
    }
  ];

  const reviews = [
    { player: "导演大冰", comment: "音质非常棒，情感表达很到位，完全超出预期！" },
    { player: "资深制作人", comment: "AI配音已经做到这个水平了，真的很惊艳，节省了大量时间。" },
    { player: "自媒体大V", comment: "专业的人工校对让成品质量非常高，可以直接使用。" },
    { player: "企业内训师", comment: "版权清晰，使用放心，是我们企业的首选配音服务。" }
  ];

  return (
    <section id="section-0" className="py-16 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-[0px] md:mb-[0px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 md:mb-6 text-xs md:text-sm px-4 md:px-6 py-1 md:py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{"AI TEXT-TO-SPEECH"}</Badge>
          <h2 className="font-black mb-4 md:mb-6 tracking-tighter text-[#8732e3] text-[32px] md:text-[60px] leading-tight">{"真情感AI配音+人工剪辑校对"}</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium px-4">{"先进AI大模型神经网络算法实现真情感配音，SOUNDVAST独家音色库，更具真人质感，专业人工剪辑校对全流程服务，成品到手可用，省心省力"}</p>
        </motion.div>

        {/* AI Voice Preview Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AIVoicePreview />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 mb-16 md:mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden border-none shadow-none text-center h-full">
                <CardContent className="p-4 md:p-10 flex flex-col items-center gap-4 md:gap-6">
                  <div className={`frosted-icon w-12 h-12 md:w-24 md:h-24 shrink-0 bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/10`}>
                    <div className="text-white drop-shadow-md">
                      {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6 md:w-10 md:h-10" })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-3xl font-bold mb-2 md:mb-4 leading-tight">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[10px] md:text-lg text-left">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Banner Images Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden glass-card border-none group"
          >
            <img 
              src="/images/partners/right_02.png" 
              alt="专业配音制作" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4 md:pb-8">
              <span className="text-white font-black text-xl md:text-4xl tracking-widest drop-shadow-lg">{"音色合法合规授权"}</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden glass-card border-none group"
          >
            <img 
              src="/images/partners/left_01.png" 
              alt="音频数字化技术" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4 md:pb-8">
              <span className="text-white font-black text-xl md:text-4xl tracking-widest drop-shadow-lg">{"无感数字水印溯源"}</span>
            </div>
          </motion.div>
        </div>

        {/* User Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-24"
        >
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">{"用户支持与喜爱"}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="glass-card hover:shadow-xl transition-all border-none">
                <CardContent className="p-4 md:p-8 border-solid border-[1px] border-[#0076ff99] rounded-[20px]">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="frosted-icon w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-primary/80 to-secondary/80">
                      <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="font-bold text-sm md:text-lg">{review.player}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[10px] md:text-base line-clamp-3 md:line-clamp-none">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Section 1: Human Dubbing
const HumanDubbingSection = () => {
  const stats = [
    { label: "声音风格", value: "1500+" },
    { label: "覆盖音色", value: "800+" },
    { label: "语言", value: "25国" },
    { label: "方言", value: "15种" }
  ];

  const actors = [
    { name: "刘冰", title: "央视配音员", bio: "资深配音艺术家，声音浑厚有力，擅长纪录片和宣传片配音", image: "https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_d3591afc-5a82-4b8c-ac76-ead20d36e5ff.jpg" },
    { name: "百变华帅", title: "多风格配音师", bio: "声线多变，可驾驭各类角色，从青年到老年，从正派到反派", image: "https://miaoda-image.cdn.bcebos.com/img/corpus/ebc2368afae74a9cb8b8aa1ea973f2b0.jpg" },
    { name: "胡海峰", title: "专业配音师", bio: "声音温暖治愈，擅长有声读物和广告配音，深受听众喜爱", image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_a672be9b-6a23-41cf-be42-b5280cac4419.jpg" },
    { name: "张艺凡", title: "电影配音导演", bio: "十余年配音导演经验，作品涵盖多部院线大片，情感把控精准。", image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_8ae7bf85-5a1c-4353-88be-51e8de5aa02b.jpg" },
    { name: "李佳琪", title: "时尚广告宠儿", bio: "声线清亮透明，充满时尚感，众多国际品牌的御用配音师。", image: "https://miaoda-image.cdn.bcebos.com/img/corpus/d7f57e3de5a545a1af541f20fdad72ba.jpg" }
  ];

  const process = [
    { icon: <Users className="w-6 h-6" />, title: "选择配音师", desc: "按场景、风格、语言选择配音师", color: "from-blue-400 to-cyan-400" },
    { icon: <Play className="w-6 h-6" />, title: "免费样音", desc: "免费试音、确认风格匹配度", color: "from-purple-400 to-pink-400" },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "确认小样", desc: "确认语速、情感、语气等细节", color: "from-emerald-400 to-teal-400" },
    { icon: <DollarSign className="w-6 h-6" />, title: "客户付款", desc: "安全付款、平台担保交易", color: "from-orange-400 to-amber-400" },
    { icon: <FileCheck className="w-6 h-6" />, title: "交付成品", desc: "提供多种格式、高品质音频文件", color: "from-rose-400 to-red-400" },
    { icon: <MessageCircle className="w-6 h-6" />, title: "售后服务", desc: "免费修改、确保满意为止", color: "from-indigo-400 to-violet-400" }
  ];

  const reasons = [
    { icon: <Award className="w-8 h-8" />, title: "专业配音品质", desc: "超1000位全球专业配音员，覆盖各类配音风格和语种", color: "from-blue-400 to-cyan-400" },
    { icon: <Zap className="w-8 h-8" />, title: "极速配音服务", desc: "真人配音30分钟内快速交付", color: "from-purple-400 to-pink-400" },
    { icon: <Shield className="w-8 h-8" />, title: "版权安全保障", desc: "签署正规合同，提供完整版权确保作品安全", color: "from-emerald-400 to-teal-400" },
    { icon: <Headphones className="w-8 h-8" />, title: "贴心售后服务", desc: "专业金牌客服团队，提供7*24小时在线服务支持", color: "from-orange-400 to-amber-400" }
  ];

  const faqs = [
    { q: "配音成品多久交付？", a: "配音之前需要先进行试音，试音过程10分钟左右，试音确认无误后将1-3小时内交付成品" },
    { q: "录制成品后还能修改吗？", a: "可以修改，老师按试音效果录制成品，读错读漏免费改的，修改文案或调整效果要增加费用哦" },
    { q: "成品录制完是否支持退款？", a: "成品交付后不支持退款，下单前请认真确认好试音效果再让老师进行录制" },
    { q: "断句和多音字需要提前告知吗？", a: "需要的，多音字需要提前在文稿内括号标注 例：重（chong 二声），断句需要提前用/符号标注，每人理解不同，断句方式也会不同" },
    { q: "如何在网站中试听我想要的风格样音呢？", a: "您可以根据自己对片子类型的需求，在更多主播页找到不同类型，如宣传片、广告片等或在网站首页点击'热门真人主播'点击任意一个样音的播放按钮，即可试听配音老师的样音。" },
    { q: "录制试音可以指定段落或内容吗？", a: "试音的意义就是让您快速听到您稿件的大体风格基调，语速语气等等。正常情况下，老师会随机在您稿件中挑选某些段落进行录制。如果稿件特殊，您可将要指定的段落标示出来，我们的配音老师就会按照您标示的段落酌情进行样音录制。" },
    { q: "是否可以先配音后付款？", a: "样音确定后，有的新客户会提出先配音后付款的要求，由于网络配音的特殊性，不支持先配音后付款的合作方式哦" }
  ];

  return (
    <section id="section-1" className="py-16 md:py-32 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 md:mb-6 text-xs md:text-sm px-4 md:px-6 py-1 md:py-1.5 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">{"HUMAN DUBBING"}</Badge>
          <h2 className="font-black mb-4 md:mb-6 tracking-tighter text-[#8732e3] text-[32px] md:text-[60px] leading-tight">{"严选全球好声音"}</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium px-4">
            全球上千位严选专业真人配音员任您挑选，涵盖了中文/英文/小语种等数十种母语配音语种，风格多样。
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 rounded-2xl bg-muted/30"
            >
              <div className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-1 md:mb-3">
                <Counter value={stat.value} />
              </div>
              <div className="text-xs md:text-base text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Voice Actors */}
        <div className="mb-16 md:mb-24 px-2 md:px-0">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">顶尖配音员声音大咖入驻</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
            {actors.map((actor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={index === 4 ? 'col-span-2 md:col-span-1' : ''}
              >
                <Card className="glass-card overflow-hidden hover:shadow-2xl transition-all group border-none h-full">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img 
                      src={actor.image} 
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardContent className="p-3 md:p-5">
                    <h4 className="text-sm md:text-xl font-bold mb-0.5 md:mb-1">{actor.name}</h4>
                    <p className="text-primary text-[10px] md:text-xs mb-1 md:mb-2 font-semibold">{actor.title}</p>
                    <p className="text-muted-foreground leading-relaxed text-[10px] md:text-xs line-clamp-2 md:line-clamp-4">{actor.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Process */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">配音服务流程</h3>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-8 relative">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className={`frosted-icon w-12 h-12 md:w-20 md:h-20 mx-auto mb-3 md:mb-5 bg-gradient-to-br ${step.color} shadow-lg shadow-primary/10`}>
                  <div className="text-white drop-shadow-sm">
                    {React.cloneElement(step.icon as React.ReactElement, { className: "w-6 h-6 md:w-8 md:h-8" })}
                  </div>
                </div>
                <h4 className="font-bold mb-1 md:mb-3 text-sm md:text-lg">{step.title}</h4>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed px-2">{step.desc}</p>
                
                {/* 虚线箭头连接线 - 仅在桌面端显示且不是最后一个元素 */}
                {index < 5 && (
                  <div className="hidden lg:block absolute top-8 md:top-10 -right-2 md:-right-4 z-10">
                    <div className="flex items-center gap-1">
                      <div className="w-4 md:w-6 h-0.5 border-t-2 border-dashed border-primary/40"></div>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-primary/60" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">{"为什么选择「声音玩家」"}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card h-full hover:shadow-xl transition-all border-none">
                  <CardContent className="p-4 md:p-8 text-center flex flex-col items-center">
                    <div className={`frosted-icon w-12 h-12 md:w-20 md:h-20 mb-3 md:mb-5 bg-gradient-to-br ${reason.color} shadow-lg shadow-primary/10`}>
                      <div className="text-white drop-shadow-sm">
                        {React.cloneElement(reason.icon as React.ReactElement, { className: "w-6 h-6 md:w-8 md:h-8" })}
                      </div>
                    </div>
                    <h4 className="font-bold mb-1 md:mb-3 text-sm md:text-lg leading-tight">{reason.title}</h4>
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12">常见问题</h3>
          <div className="max-w-4xl mx-auto px-2 md:px-0">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card px-4 md:px-8 py-1 md:py-2 border-none rounded-2xl">
                  <AccordionTrigger className="text-left font-bold hover:no-underline text-base md:text-lg">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Section 2: Voice Cloning
const VoiceCloningSection = () => {
  return (
    <section id="section-2" className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 md:mb-6 text-xs md:text-sm px-4 md:px-6 py-1 md:py-1.5 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">{"AI VOICE CLONING"}</Badge>
          <h2 className="font-black mb-4 md:mb-6 tracking-tighter text-[#8732e3] text-[32px] md:text-[60px] leading-tight">极速克隆，完美复刻</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium px-4">{"复刻特色声音，为创作带来更多元更高效的方式，激发创作灵感"}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card h-full hover:shadow-2xl transition-all border-none text-center">
              <CardContent className="p-4 md:p-10 flex flex-col items-center gap-4 md:gap-6 border-dashed bg-[#fd8d8d00] bg-none border-[rgb(39,39,39)] border-[0.666667px] border-[#0076ff99]">
                <div className="frosted-icon w-12 h-12 md:w-24 md:h-24 shrink-0 bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg shadow-orange-500/20">
                  <Zap className="w-6 h-6 md:w-12 md:h-12 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-sm md:text-3xl font-bold mb-2 md:mb-4 leading-tight">极速克隆</h3>
                  <p className="text-muted-foreground leading-relaxed text-[10px] md:text-lg">{"只需3-5秒音频，即可完美复刻任何人的音色和说话风格，音色音调高度还原真人音色特点、风格、口音和声学环境"}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card h-full hover:shadow-2xl transition-all border-none text-center">
              <CardContent className="p-4 md:p-10 flex flex-col items-center gap-4 md:gap-6 border-dashed border-[rgb(0,0,0)] border-[0.666667px] border-[#0076ff99]">
                <div className="frosted-icon w-12 h-12 md:w-24 md:h-24 shrink-0 bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/20">
                  <Cpu className="w-6 h-6 md:w-12 md:h-12 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-sm md:text-3xl font-bold mb-2 md:mb-4 leading-tight">技术领先</h3>
                  <p className="text-muted-foreground leading-relaxed text-[10px] md:text-lg">{"全新的大模型算法，高品质复刻能力，效果行业领先，不仅能很好地复刻素人的声音，更能高度还原专业声优音色声线和韵律起伏。"}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Partners Section
const PartnersSection = () => {
  const partners = [
    "/images/partners/01.png",
    "/images/partners/02.png",
    "/images/partners/03.png",
    "/images/partners/04.png",
    "/images/partners/05.png",
    "/images/partners/06.png",
    "/images/partners/07.png",
    "/images/partners/08.png"
  ];

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter">合作伙伴</h2>
          <p className="text-base md:text-xl text-muted-foreground font-medium">
            不断创新探索，提供合作伙伴品质好声音
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-10 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="aspect-video glass-card rounded-2xl flex items-center justify-center p-8 hover:shadow-xl transition-all border-solid border-[rgba(255,255,255,0.6)] border-[1px] border-[#0076ff99]"
            >
              <img 
                src={partner} 
                alt={`Partner ${index + 1}`}
                className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 3: About Us
const AboutSection = () => {
  const applications = [
    "短视频",
    "政企宣传",
    "教育",
    "动漫",
    "有声读物",
    "影视广告"
  ];

  return (
    <section id="section-3" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 md:mb-6 text-xs md:text-sm px-4 md:px-6 py-1 md:py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{"ABOUT US"}</Badge>
          <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter text-[#8732e3] leading-tight">{"关于我们"}</h2>
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 leading-relaxed font-medium px-4">{"『声音玩家』是PAIKERA旗下研发的真情感AI配音服务IP品牌"}</p>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-xl text-muted-foreground font-medium max-w-lg mx-auto px-4">
            <div className="flex items-center justify-start md:justify-center gap-4">
              <div className="frosted-icon w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gradient-to-br from-primary/80 to-secondary/80">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-sm md:text-xl text-left">{"AI大模型神经网络实现真情感AI配音"}</span>
            </div>
            <div className="flex items-center justify-start md:justify-center gap-4">
              <div className="frosted-icon w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gradient-to-br from-primary/80 to-secondary/80">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-sm md:text-xl text-left">{"数十款SOUNDVAST独家调教音色库"}</span>
            </div>
            <div className="flex items-center justify-start md:justify-center gap-4">
              <div className="frosted-icon w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gradient-to-br from-primary/80 to-secondary/80">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-sm md:text-xl text-left">{"严选1000+全球语种专业真人配音员"}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8">覆盖数百行业场景</h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4">
            {applications.map((app, index) => (
              <Badge key={index} variant="outline" className="text-xs md:text-lg px-3 md:px-6 py-1 md:py-2 border-primary/30 hover:bg-primary/10 transition-colors">
                {app}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground font-medium px-4 text-[27px] md:text-[27px]">{"已获数万影视公司、媒体单位、企业用户、教育工作者赞誉"}</p>
        </motion.div>

        {/* Service Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative">
            {[
              { icon: <Headphones className="w-6 h-6 md:w-8 md:h-8" />, title: "全天候售后服务", desc: "7x24小时专业客服品质服务", color: "from-blue-400 to-cyan-400" },
              { icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />, title: "极速服务应答", desc: "秒级应答及时满足客户需求", color: "from-purple-400 to-pink-400" },
              { icon: <Award className="w-6 h-6 md:w-8 md:h-8" />, title: "客户价值为先", desc: "从服务价值到创造客户价值", color: "from-emerald-400 to-teal-400" },
              { icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />, title: "全方位版权保障", desc: "所有音色合法合规可溯源", color: "from-orange-400 to-amber-400" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <Card className="glass-card border-none hover:shadow-xl transition-all group h-full">
                  <CardContent className="p-4 md:p-6 flex flex-col items-center gap-3 md:gap-4">
                    <div className={`frosted-icon w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-white drop-shadow-md">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm md:text-lg font-bold mb-1 md:mb-2">{feature.title}</h4>
                      <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 虚线箭头连接线 - 仅在桌面端显示且不是最后一个元素 */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-0.5 border-t-2 border-dashed border-primary/40"></div>
                      <ArrowRight className="w-4 h-4 text-primary/60" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="border-t border-border py-12 md:py-20 bg-[#ffffff] bg-none">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12 md:mb-16">
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-xl md:text-2xl mb-6 md:mb-8">联系我们</h4>
            <div className="space-y-4 md:space-y-6 text-muted-foreground">
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                <div className="frosted-icon w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-sm" />
                </div>
                <span className="text-sm md:text-lg">{"商务联系电话：180-1151-9550"}</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                <div className="frosted-icon w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-sm" />
                </div>
                <span className="text-sm md:text-lg text-center md:text-left">{"四川省成都市双流区银河路四段222号附1号"}</span>
              </div>
            </div>
          </div>

          {/* QR Codes */}
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-xl md:text-2xl mb-6 md:mb-8">{"扫一扫 添加客服微信"}</h4>
            <div className="flex gap-6 md:gap-10">
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-xl md:rounded-2xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden border-none shadow-xl">
                  <img
                    src="https://miaoda-edit-image.cdn.bcebos.com/9v6jfa2xcxz5/IMG-9vcj9pkqc5c0.png"
                    alt="微信客服1"
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                    data-editor-config="%7B%22defaultSrc%22%3A%22https%3A%2F%2Fmiaoda-edit-image.cdn.bcebos.com%2F9v6jfa2xcxz5%2FIMG-9vcj9pkqc5c0.png%22%7D" />
                </div>
                <p className="text-muted-foreground font-bold text-xs md:text-base">微信客服1</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-xl md:rounded-2xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden border-none shadow-xl">
                  <img
                    src="https://miaoda-edit-image.cdn.bcebos.com/9v6jfa2xcxz5/IMG-9vcm898tatc0.png"
                    alt="微信客服2"
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                    data-editor-config="%7B%22defaultSrc%22%3A%22https%3A%2F%2Fmiaoda-edit-image.cdn.bcebos.com%2F9v6jfa2xcxz5%2FIMG-9vcm898tatc0.png%22%7D" />
                </div>
                <p className="text-muted-foreground font-bold text-xs md:text-base">微信客服2</p>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <div className="flex items-center gap-3 mb-4 md:mb-6 opacity-80">
              <div className="w-[180px] h-[55px] md:w-[300px] md:h-[92px] from-primary to-secondary rounded-lg flex items-center justify-center bg-inherit bg-contain bg-center bg-no-repeat bg-[url(https://miaoda-edit-image.cdn.bcebos.com/9v6jfa2xcxz5/IMG-9v8qi7sc33eo.png)]"></div>
            </div>
            <p className="text-muted-foreground font-medium text-sm md:text-base">{"SoundVAST 声音玩家，让声音更鲜活！"}</p>
            <p className="text-muted-foreground/60 text-[10px] md:text-xs mt-2">{"Copyright © 2026 PAIKERA Inc. All Rights Reserved. "}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 md:pt-10 text-center text-muted-foreground/60 text-[10px] md:text-sm flex flex-wrap justify-center gap-4 md:gap-8">
          <a href="#" className="hover:text-primary transition-colors">{"服务协议"}</a>
          <a href="#" className="hover:text-primary transition-colors">{"隐私条款"}</a>
          <a href="#" className="hover:text-primary transition-colors">{"产品文档"}</a>
          <a href="#" className="hover:text-primary transition-colors">{"ICP备案"}</a>
        </div>
      </div>
    </footer>
  );
};

// --- Landing Page Layout ---

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 antialiased">
      <Header />
      <main>
        <Hero />
        <AIDubbingSection />
        <HumanDubbingSection />
        <VoiceCloningSection />
        <PartnersSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
