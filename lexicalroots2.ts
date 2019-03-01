
let list_of_new_syllables = [
    'jirx', 'jex', 'jek', 'jeng', 'jerx',

    'mnghh',

    'n',

    'sm',
]

let list_of_ziang_syllables = []

let list_of_zoanx_syllables = [
    'hoang',
]

export let list_of_lexical_roots = [
    'a', 'ay', 'azs', 'ah', 'ahh', 'ai', 'aiy', 'aiw', 'ainnzs', 'ak', 'am', 'amy', 'amw', 'amx', 'amzs', 'an', 'any', 'anw', 'anx',
    'anzs', 'ang', 'angw', 'angx', 'angzs', 'annw', 'annx', 'annzs', 'ap', 'app', 'at', 'au', 'auy', 'auw', 'aux', 'auzs',

    'ba', 'bax', 'bazs', 'bah', 'bai', 'baiy', 'baix', 'bak', 'bakk', 'ban', 'bany', 'banx', 'banzs', 'bangy', 'bangw', 'bangx',
    'bangzs', 'bat', 'batt', 'bauy', 'bauzs', 'bey', 'bex', 'bezs', 'beh', 'behh', 'biy', 'bix', 'bizs', 'bieny', 'bienx', 'bienzs',
    'biett', 'biauy', 'biaux', 'biauzs', 'bih', 'bihh', 'bekk', 'biny', 'binx', 'binzs', 'bengy', 'bengx', 'bengzs', 'biury', 'biurx',
    'biurzs', 'bit', 'biuzs', 'bury', 'burx', 'burzs', 'bok', 'bokk', 'bong', 'bongy', 'bongw', 'bongx', 'bongzs', 'boy', 'box',
    'bozs', 'buy', 'bux', 'buzs', 'boax', 'boah', 'boahh', 'boany', 'boatt', 'boey', 'boex', 'boezs', 'boehh', 'bui', 'buny', 'bunw',
    'bunx', 'bunzs', 'but', 'butt',
    
    'ca', 'cay', 'cax', 'cazs', 'cah', 'cai', 'caiy', 'caiw', 'caix', 'caizs', 'cak', 'cakk', 'cam', 'camy', 'camw', 'camx', 'can',
    'canw', 'canx', 'cang', 'cangy', 'cangw', 'canny', 'cannzs', 'cap', 'capp', 'cat', 'catt', 'cau', 'cauy', 'cauw', 'cauhh', 'ce',
    'cey', 'cew', 'cex', 'cezs', 'ceh', 'cenn', 'cenny', 'cennw', 'ci', 'ciy', 'ciw', 'cix', 'cizs', 'cia', 'ciax', 'ciah', 'ciakk',
    'ciam', 'ciamy', 'cien', 'cieny', 'cienx', 'ciangy', 'ciangw', 'ciangx', 'ciangzs', 'ciann', 'cianny', 'ciannw', 'ciannx',
    'ciap', 'ciet', 'ciau', 'ciauw', 'ciaux', 'cih', 'cihh', 'cek', 'cekk', 'cim', 'cimy', 'cin', 'cinw', 'ceng', 'cengy', 'cengw',
    'cengx', 'cengzs', 'cinn', 'cinny', 'cinnx', 'ciur', 'ciurw', 'ciurzs', 'ciurh', 'ciurhh', 'ciok', 'ciokk', 'ciong', 'ciongw',
    'cip', 'cit', 'ciu', 'ciuy', 'ciux', 'ciuzs', 'ciunn', 'ciunny', 'ciunnw', 'ciunnx', 'ciunnzs', 'cng', 'cngy', 'cngw', 'cngx',
    'cngh', 'cnghh', 'cur', 'cury', 'curw', 'curh', 'cok', 'cokk', 'cong', 'congy', 'congw', 'congx', 'co', 'coy', 'cow', 'cu', 'cuy',
    'cuw', 'cuzs', 'coaw', 'coazs', 'coah', 'coahh', 'coan', 'coan', 'coanw', 'coanx', 'coangw', 'coann', 'coannw', 'coe', 'coey',
    'coex',   'coezs', 'cuh', 'cuhh', 'cui', 'cuiy', 'cuiw', 'cun', 'cuny', 'cunw', 'cunx', 'cunzs', 'cut',

    'da', 'day', 'daw', 'dah', 'dahh', 'dai', 'daiy', 'daiw', 'daix', 'diazs', 'dainn', 'dianny', 'dak', 'dakk', 'dam', 'damy',
    'damw', 'damx', 'damzs', 'dan', 'dany', 'danw', 'danx', 'danzs', 'dang', 'dangy', 'dangw', 'dangx', 'dangzs', 'dann', 'danny',
    'dannw', 'dannx', 'dannzs', 'dap', 'dapp', 'dat', 'datt', 'dau', 'dauy', 'dauw', 'daux', 'dauzs', 'dauh', 'dauhh', 'de', 'dey',
    'dew', 'dex', 'dezs', 'deh', 'denn', 'dennw', 'dennzs', 'di', 'diy', 'diw', 'dix', 'dizs', 'dia', 'diah', 'diahh', 'diak',
    'diakk', 'diam', 'diamy', 'diamw', 'diamx', 'diamzs', 'dien', 'dieny', 'dienx', 'dienzs', 'dianny', 'diannx', 'diannzs', 'diap',
    'diapp', 'diet', 'diett', 'diau', 'diauw', 'diaux', 'diauzs', 'dih', 'dihh', 'dek', 'dekk', 'dimw', 'dimx', 'dimzs', 'din', 'diny',
    'dinw', 'dinx', 'dinzs', 'deng', 'dengy', 'dengw', 'dengx', 'dengzs', 'dinn', 'dinnx', 'dinnzs', 'dinnhh', 'diurw', 'diurx',
    'diurzs', 'diurh', 'diurhh', 'diok', 'diokk', 'diong', 'diongy', 'diongw', 'diongx', 'diongzs', 'dit', 'ditt', 'diu', 'diuy',
    'diuw', 'diux', 'diuzs', 'diuh', 'diunn', 'diunny', 'diunnw', 'diunnx', 'diunnzs', 'dng', 'dngy', 'dngw', 'dngx', 'dngzs',
    'dur', 'dury', 'durw', 'durx', 'durzs', 'durh', 'durhh', 'dok', 'dokk', 'domx', 'dong', 'dongy', 'dongw', 'dongx', 'dongzs', 'do',
    'doy', 'dow', 'dox', 'dozs', 'du', 'duy', 'duw', 'dux', 'duzs', 'doaw', 'doazs', 'doan', 'doany', 'doanw', 'doanzs', 'doann',
    'doannw', 'doannx', 'doannzs', 'doat', 'doatt', 'doew', 'doex', 'doezs', 'duh', 'duhh', 'dui', 'duiw', 'duix', 'duizs', 'dun',
    'duny', 'dunw', 'dunzs', 'dutt', 

    'e', 'ey', 'ew', 'ex', 'ezs', 'eh', 'ehh', 'enn', 'ennx',

    'gax', 'gazs', 'gaix', 'gaizs', 'gakk', 'gamy', 'gamx', 'gamzs', 'gany', 'ganw', 'ganx', 'ganzs', 'gangzs', 'gaux', 'gew', 'gex',
    'gezs', 'giy', 'gix', 'gizs', 'giax','giah', 'giahh', 'giamy', 'giamx', 'giamzs', 'gieny', 'gienw', 'gienx', 'gienzs', 'giang',
    'giangw', 'giangzs', 'giap', 'giapp', 'giet', 'giett', 'giaux', 'gekk', 'gimy', 'gimx', 'gimzs', 'giny', 'ginx', 'ginzs', 'gengy',
    'gengx', 'giury', 'giurx', 'giurhh', 'giok', 'giokk', 'giongy', 'giuy', 'giux', 'gurx', 'gurzs', 'gokk', 'gongx', 'gongzs', 'gox',
    'gozs', 'guy', 'gux', 'guzs', 'goay', 'goazs', 'goany', 'goanx', 'goanzs', 'goatt', 'goezs', 'goehh', 'guix', 'guizs',
    
    'ha', 'haw', 'hax', 'hazs', 'hah', 'hahh', 'hai', 'haiy', 'haix', 'haizs', 'hainn', 'hainnw', 'hainnx', 'hak', 'hakk', 'ham',
    'hamy', 'hamw', 'hamx', 'hamzs','han', 'hany', 'hanw', 'hanx', 'hanzs', 'hang', 'hangw', 'hangx', 'hangzs', 'hanny', 'hannx',
    'hannzs', 'hannh', 'hap', 'happ', 'hat', 'hatt', 'hau', 'hauy', 'hauw', 'haux', 'hauzs', 'he', 'hey', 'hew', 'hex', 'hezs', 'heh',
    'hennw', 'hennx', 'hennh', 'hi', 'hiy', 'hiw','hix', 'hia', 'hiazs', 'hiah', 'hiahh', 'hiam', 'hiamy', 'hiamw', 'hiamx', 'hien',
    'hieny', 'hienw', 'hienx', 'hienzs', 'hiang', 'hiangy', 'hiangw', 'hiann', 'hianny', 'hiannw', 'hiannx', 'hiannzs', 'hiannh',
    'hiapp', 'hiet', 'hiett', 'hiau', 'hiauy', 'hiaux', 'hiauh', 'hek', 'hekk', 'him', 'himx', 'hin', 'hinx', 'hinzs', 'heng', 'hengw',
    'hengx', 'hengzs', 'hinn', 'hinnw', 'hinnzs', 'hiurx', 'hiurzs', 'hiurh', 'hiurhh', 'hiok', 'hiong', 'hiongy', 'hiongw',
    'hiongx', 'hip','hit', 'hitt', 'hiu', 'hiuy', 'hiuw', 'hiux', 'hiunn', 'hiunnhh', 'hmy', 'hmx', 'hmh', 'hmhh', 'hng', 'hngy',
    'hngx', 'hngzs', 'hngh', 'hnghh', 'hury', 'hurx', 'hurzs', 'hurhh', 'hok', 'hokk', 'hong', 'hongy', 'hongw', 'hongx', 'hongzs',
    'honn', 'honny', 'honnw', 'honnh', 'ho', 'hoy', 'how', 'hox', 'hozs', 'hu', 'huy', 'huw', 'hux', 'huzs', 'hoa', 'hoaw', 'hoax',
    'hoazs', 'hoah', 'hoahh', 'hoaix', 'hoaizs', 'hoainnx', 'hoan', 'hoany', 'hoanw', 'hoanx', 'hoanzs', 'hoann', 'hoanny', 'hoannx',
    'hoannzs', 'hoat', 'hoatt', 'hoe', 'hoey', 'hoew', 'hoex', 'hoezs', 'hoeh', 'hui', 'huiy', 'huiw', 'huix', 'huizs', 'hun',
    'huny', 'hunw', 'hunx', 'hunzs', 'hut', 'hutt',

    'i', 'iy', 'iw', 'ix', 'izs', 'ia', 'iay', 'iaw', 'iax', 'iazs', 'iah', 'iahh', 'iam', 'iamy', 'iamx', 'iamzs', 'ien', 'ieny',
    'ienw', 'ienx', 'iang', 'iangzs', 'iann', 'ianny', 'iannw', 'iannx', 'iannzs', 'iap', 'iapp', 'iet', 'iett', 'iau', 'iauy',
    'iauw', 'iaux', 'iauzs', 'iaunn', 'ek', 'ekk', 'im', 'imy', 'imw', 'imx', 'in', 'iny', 'inw', 'inx', 'inzs', 'eng', 'engy',
    'engw', 'engx', 'engzs', 'inn', 'inny', 'innw', 'innx', 'innzs', 'iur', 'iury', 'iurx', 'iurh', 'iurhh', 'iok', 'iokk', 'iong',
    'iongy', 'iongw', 'iongx', 'iongzs', 'ip', 'it', 'itt', 'iu', 'iuy', 'iuw', 'iux', 'iuzs', 'iunn', 'iunny', 'iunnx', 'iunnzs',

    'jiy', 'jix', 'jizs', 'jia', 'jiay', 'jiamy', 'jienx', 'jiangy', 'jiapp', 'jiett', 'jiauy', 'jiauw', 'jiaux', 'jimy', 'jimx',
    'jimzs', 'jinx', 'jinzs', 'jiurzs', 'jiok', 'jiokk', 'jiongy', 'jiongx', 'jiongzs', 'jipp', 'jitt', 'jiux', 'juy', 'jux', 'juzs',
    'joahh', 'joex', 'joezs', 'junzs',

    'ka', 'kay', 'kaw', 'kah', 'kahh', 'kai', 'kaiy', 'kaiw', 'kainn', 'kainny', 'kak', 'kakk', 'kam', 'kamy', 'kamw', 'kan', 
    'kanw', 'kang', 'kangy', 'kangw', 'kann', 'kap', 'kapp', 'kat', 'kau', 'kauy', 'kauw', 'ke', 'key', 'kew', 'kex', 'keh', 'kehh',
    'kenn', 'kennhh', 'ki', 'kiy', 'kiw', 'kix', 'kizs', 'kia', 'kiax', 'kiazs', 'kiah', 'kiakk', 'kiam', 'kiamw', 'kiamx',
    'kiamzs', 'kien', 'kieny', 'kienw', 'kienx', 'kiang', 'kiangw', 'kiap', 'kiet', 'kiett', 'kiau', 'kiauy', 'kiauw', 'kiauh',
    'kih', 'kek', 'kim', 'kimy', 'kimx', 'kin', 'kiny', 'kinx', 'keng', 'kengy', 'kengw', 'kengx', 'kengzs', 'kinnx', 'kiury',
    'kiurw', 'kiurh', 'kiok', 'kiong', 'kiongy', 'kiongx', 'kip', 'kipp', 'kit', 'kitt', 'kiu', 'kiuy', 'kiux', 'kiuzs', 'kiunn',
    'kiunnzs', 'kng', 'kngw', 'kur', 'kury', 'kurw', 'kurx', 'kok', 'kokk', 'kong', 'kongy', 'kongw', 'kongzs', 'ko', 'koy', 'kow',
    'ku', 'kux', 'kuzs', 'koa', 'koay', 'koaw', 'koah', 'koaiw', 'koan', 'koany', 'koanw', 'koanx', 'koann', 'koanny', 'koannw',
    'koat', 'koe', 'koew', 'koex', 'koeh', 'kuh', 'kui', 'kuiy', 'kuiw', 'kun', 'kuny', 'kunw', 'kunx', 'kut', 'kutt',


    'la', 'lax', 'lazs', 'lah', 'lahh', 'laix', 'laizs', 'lak', 'lakk', 'lam', 'lamy', 'lamw', 'lamx', 'lamzs', 'lan', 'lany',
    'lanx', 'lanzs', 'lang', 'langy', 'langw', 'langx', 'langzs', 'lap', 'lapp', 'latt', 'lauy', 'lauw', 'laux', 'lauzs', 'lauhh',
    'le', 'ley', 'lew', 'lex', 'lezs', 'leh', 'lehh', 'li', 'liy', 'liw', 'lix', 'lizs', 'liah', 'liahh', 'liam', 'liamy', 'liamw', 
    'liamx', 'liamzs', 'lien', 'lieny', 'lienx', 'lienzs', 'liang', 'liangy', 'liangx', 'liangzs', 'liap', 'liapp', 'liet', 'liauy',
    'liauw', 'liaux', 'liauzs', 'lihh', 'lek', 'lekk', 'lim', 'limy', 'limx', 'limzs', 'lin', 'liny', 'linw', 'linx', 'limzs', 'leng',
    'lengy', 'lengw', 'lengx', 'lengzs', 'liury', 'liurx', 'liurzs', 'liurhh', 'liok', 'liokk', 'liongy', 'liongw', 'liongx',
    'liongzs', 'lipp', 'liu', 'liuy', 'liuw', 'liux', 'liuzs', 'lur', 'lury', 'lurw', 'lurx', 'lurzs', 'lurh', 'lurhh', 'lok', 'lokk',
    'long', 'longy', 'longw', 'longx', 'longzs', 'loy', 'lox', 'lozs', 'lu', 'luy', 'luw', 'lux', 'luzs', 'loax', 'loazs', 'loah',
    'loahh', 'loany', 'loanx', 'loanzs', 'loatt', 'loex', 'loezs', 'lui', 'luiy', 'luiw', 'luix', 'luizs', 'lun', 'luny', 'lunx',
    'lunzs', 'lut', 'lutt',

    'my', 'mx', 'mzs', 'ma', 'may', 'maw', 'max', 'mazs', 'mai', 'maiy', 'maiw', 'maizs', 'mau', 'maux', 'mauzs', 'mauh', 'me',
    'mey', 'mex', 'mezs', 'meh', 'mehh', 'mi', 'miy', 'mix', 'mizs', 'miax', 'miazs', 'miauzs', 'mih', 'mihh', 'mngy', 'mngx',
    'mngzs', 'mo', 'moy', 'mox', 'mozs', 'moh', 'mohh', 'moa', 'moay', 'moax', 'moazs', 'muiy', 'muix',

    'nay', 'naw', 'nax', 'nazs', 'nah', 'nai', 'naiy', 'naizs', 'nauy', 'nauzs', 'nauh', 'ne', 'nex', 'neh', 'ni', 'niy', 'nix',
    'nizs', 'niay', 'niax', 'niazs', 'niau', 'niauy', 'nih', 'niuy', 'niux', 'niuzs', 'nng', 'nngy', 'nngw', 'nngx', 'nngzs',
    'noy', 'nozs', 'noay', 'noaw', 'noax', 'noazs',

    'ng', 'ngy', 'ngw', 'ngx', 'ngzs', 'ngay', 'ngaizs', 'ngaux', 'ngauzs', 'ngey', 'ngezs', 'ngeh', 'ngehh', 'ngiax', 'ngiau',
    'ngiauy', 'ngiauh', 'ngiauhh', 'ngoy', 'ngox', 'ngozs',

    'o', 'oy', 'ox', 'ozs', 'ok', 'om', 'omzs', 'ong', 'ongy', 'ongx', 'ongzs', 'onn', 'onnw', 

    'pa', 'paw', 'pazs', 'pah', 'paiw', 'painny', 'painnzs', 'pak', 'pakk', 'pan', 'pan', 'pang', 'pangy', 'pangw', 'pangx',
    'pangzs', 'pannw', 'pannzs', 'pau', 'pauy', 'pauw', 'pauzs', 'pauhh', 'pe', 'pey', 'pew', 'pezs', 'penn', 'pennx', 'pennzs',
    'pi', 'piy', 'piw', 'pix', 'pizs', 'piah', 'piahh', 'piak', 'piakk', 'pien', 'pienw', 'pienx', 'piang', 'piangzs', 'piann',
    'pianny', 'piannx', 'piet', 'piau', 'piauw', 'piaux', 'pih', 'pihh', 'pek', 'piny', 'pinx', 'pinzs', 'peng', 'pengw', 'pengx',
    'pengzs', 'pinn', 'pinnw', 'pinnx', 'pinnzs', 'piurw', 'piurx', 'pit', 'pngh', 'pur', 'pury', 'purw', 'purzs', 'purh', 'pok',
    'pokk', 'pong', 'pongy', 'pongw', 'pongx', 'pongzs', 'po', 'poy', 'pow', 'pox', 'pozs', 'puy', 'pux', 'puzs', 'poaw', 'poah',
    'poahh', 'poan', 'poanx', 'poanzs', 'poann', 'poannw', 'poannzs', 'poat', 'poe', 'poey', 'poew', 'poex', 'poezs', 'poehh', 'puhh',
    'puiy', 'puiw', 'pun', 'puny', 'punw', 'punx', 'put', 'putt',

    'qa', 'qay', 'qaw', 'qazs', 'qah', 'qai', 'qaiy', 'qaiw', 'qainn', 'qainnx', 'qak', 'qakk', 'qam', 'qamy', 'qamw', 'qamx',
    'qan', 'qany', 'qanw', 'qang', 'qangy', 'qangw', 'qangx', 'qangzs', 'qann', 'qanny', 'qannw', 'qannx', 'qap', 'qat', 'qau',
    'qauy', 'qauw', 'qaux', 'qauzs', 'qauh', 'qe', 'qey', 'qew', 'qezs', 'qeh', 'qehh', 'qenn', 'qenny', 'qennw', 'qi', 'qiy',
    'qiw', 'qix', 'qizs', 'qia', 'qiaw', 'qiazs', 'qiahh', 'qiam', 'qiamy', 'qiamw', 'qiamx', 'qien', 'qieny', 'qienw', 'qienzs',
    'qiann', 'qianny', 'qiannw', 'qiannx', 'qiannzs', 'qiap', 'kiet', 'kiett', 'qiau', 'qiauy', 'qiaux', 'qiauzs', 'qek', 'qekk',
    'qim', 'qimy', 'qimw', 'qimzs', 'qin', 'qiny', 'qinw', 'qinzs', 'qeng', 'qengy', 'qengw', 'qengx', 'qengzs', 'qinn', 'qinnw',
    'qinnx', 'kiurw', 'qiurx', 'qiurzs', 'qiurh', 'qiok', 'qiokk', 'qiong', 'qiongy', 'qiongx', 'qiongzs', 'qip', 'qipp', 'qitt',
    'qiu', 'qiuy', 'qiuw', 'qiux', 'qiuzs', 'qiunn', 'qng', 'qngy', 'qngw', 'qur', 'qury', 'qurw', 'qurx', 'qurzs', 'qurh', 'qok',
    'qokk', 'qong', 'qongy', 'qongw', 'qongx', 'qonnx', 'qo', 'qoy', 'qow', 'qox', 'qozs', 'qu', 'quy', 'quw', 'quzs', 'qoa',
    'qoay', 'qoaw', 'qoazs', 'qoah', 'qoai', 'qoaiy', 'qoaiw', 'qoainn', 'qoainny', 'qoainnzs', 'qoan', 'qoany', 'qoanw', 'qoanx',
    'qoanzs', 'qoann', 'qoanny', 'qoannx', 'qoannzs', 'qoat', 'qoe', 'qoey', 'qoew', 'qoeh', 'qui', 'quiy', 'quiw', 'quix',
    'quizs', 'qun', 'quny', 'qunw', 'qunx', 'qunzs', 'qut', 'qutt',

    'sa', 'say', 'saw', 'sah', 'sahh', 'sai', 'saiy', 'saiw', 'saix', 'saizs', 'sak', 'sam', 'samy', 'samw', 'samx', 'san', 'sany',
    'sanw', 'sang', 'sangy', 'sangw', 'sann', 'sannh', 'sap', 'sat', 'sau', 'sauy', 'se', 'sey', 'sew', 'sex', 'seh', 'sehh', 'senn',
    'senny', 'sennw', 'si', 'siy', 'siw', 'six', 'sizs', 'sia', 'siay', 'siaw', 'siax', 'siazs', 'siah', 'siahh', 'siak', 'siam',
    'siamy', 'siamw', 'siamx', 'sien', 'sieny', 'sienw', 'sienx', 'sienzs', 'siang', 'siangy', 'siangw', 'siangx', 'siangzs',
    'siann', 'sianny', 'siannw', 'siannx', 'siannzs', 'siap', 'siapp', 'siet', 'siett', 'siau', 'siauy', 'siauw', 'siaux', 'siauzs',
    'sih', 'sihh', 'sek', 'sekk', 'sim', 'simy', 'simw', 'simx', 'simzs', 'sin', 'sinw', 'sinx', 'sinzs', 'seng', 'sengy', 'sengw',
    'sengx', 'sengzs', 'sinn', 'sinnw', 'sinnzs', 'siur', 'siury', 'siurx', 'siurh', 'siurhh', 'siok', 'siokk', 'siong', 'siongy',
    'siongw', 'siongx', 'siongzs', 'sip', 'sipp', 'sit', 'sitt', 'siu', 'siuy', 'siuw', 'siux', 'siuzs', 'siunn', 'siunny', 'siunnw',
    'siunnx', 'siunnzs', 'sng', 'sngy', 'sngw', 'sngx', 'sngh', 'sur', 'sury', 'surw', 'surx', 'surzs', 'surh', 'sok', 'som',
    'song', 'songy', 'songw', 'songx', 'so', 'soy', 'sow', 'su', 'suy', 'suw', 'sux', 'suzs', 'soa', 'soay', 'soaw', 'soah', 'soai',
    'soainnzs', 'soan', 'soany', 'soanw', 'soanx', 'soanzs', 'soann', 'soanny', 'soannw', 'soat', 'soe', 'soey', 'soew', 'soex',
    'soeh', 'suh', 'sui', 'suiy', 'suiw', 'suix', 'suizs', 'sun', 'suny', 'sunw', 'sunx', 'sunzs', 'sut', 'sutt',

    'taw', 'tah', 'tahh', 'tai', 'taiy', 'taiw', 'taix', 'taizs', 'tak', 'takk', 'tam', 'tamw', 'tamx', 'tamzs', 'tan', 'tany',
    'tanw', 'tanx', 'tang', 'tangy', 'tangw', 'tangx', 'tann', 'tanny', 'tap', 'tat', 'tau', 'tauy', 'tauw', 'taux', 'tauzs', 'te',
    'tey', 'tew', 'tex', 'tezs', 'teh', 'tehh', 'tennw', 'tennx', 'ti', 'tiy', 'tiw', 'tix', 'tizs', 'tiah', 'tiam', 'tiamy',
    'tiamzs', 'tien', 'tieny', 'tiann', 'tiannw', 'tiannx', 'tiannzs', 'tiap', 'tiapp', 'tiet', 'tiau', 'tiauy', 'tiauw', 'tiaux',
    'tiauzs', 'tih', 'tihh', 'tek', 'tekk', 'tim', 'tin', 'tinx', 'tinzs', 'teng', 'tengy', 'tengw', 'tengx', 'tinn', 'tinnzs',
    'tiur', 'tiurw', 'tiurx', 'tiok', 'tiong', 'tiongy', 'tiongw', 'tiongx', 'tiu', 'tiuy', 'tng', 'tngw', 'tngx', 'tngzs', 'tur',
    'tury', 'turw', 'turx', 'turh', 'turhh', 'tok', 'tokk', 'tong', 'tongy', 'tongw', 'tongzs', 'toy', 'tow', 'tox', 'tuy', 'toa',
    'toazs', 'toah', 'toanx', 'toann', 'toanny', 'toannw', 'toat', 'tuh', 'tui', 'tuiy', 'tuiw', 'tuix', 'tun', 'tuny', 'tunx',
    'tunzs', 'tut', 'tutt',

    'u', 'uy', 'uw', 'ux', 'uzs', 'oa', 'oay', 'oax', 'oahh', 'oai', 'oainny', 'oan', 'oany', 'oanw', 'oanx', 'oanzs', 'oang',
    'oann', 'oanny', 'oannw', 'oannzs', 'oat', 'oatt', 'oe', 'oey', 'oew', 'oex', 'oezs', 'oeh', 'uh', 'ui', 'uiy', 'uiw', 'uix',
    'uizs', 'un', 'uny', 'unw', 'unx', 'unzs', 'ut',

    'ur', 'urw', 'urx', 'urh', 'urhh',

    'va', 'vay', 'vaw', 'vax', 'vazs', 'vah', 'vai', 'vaiy', 'vaiw', 'vaix', 'vaizs', 'vak', 'vakk', 'van', 'vany', 'vanx', 'vanzs',
    'vang', 'vangy', 'vangw', 'vangx', 'vat', 'vatt', 'vau', 'vauy', 'vaux', 'vauzs', 've', 'vey', 'vew', 'vex', 'vezs', 'veh',
    'vehh', 'venn', 'vennw', 'vennx', 'vennzs', 'vi', 'viy', 'viw', 'vix', 'vizs', 'viah', 'viak', 'viakk', 'vien', 'vieny', 'vienw',
    'vienzs', 'viangw', 'viangzs', 'viann', 'vianny', 'viannw', 'viannx', 'viet', 'viett', 'viau', 'viauy', 'vih', 'vek', 'vekk',
    'vin', 'viny', 'vinw', 'vinx', 'veng', 'vengy', 'vengw', 'vengx', 'vengzs', 'vinn', 'vinny', 'vinnw', 'vinnzs', 'viur', 'viury',
    'viurzs', 'vit', 'vitt', 'viu', 'vng', 'vngy', 'vngzs', 'vur', 'vury', 'vurw', 'vurx', 'vurzs', 'vurh', 'vurhh', 'vok', 'vokk',
    'vongy', 'vongw', 'vongx', 'vongzs', 'vo', 'voy', 'vow', 'vox', 'vozs', 'vu', 'vuw', 'vux', 'vuzs', 'voaw', 'voah', 'voahh',
    'voan', 'voanw', 'voanx', 'voanzs', 'voann', 'voanny', 'voannw', 'voannx', 'voannzs', 'voat', 'voatt', 'voe', 'voey', 'voew',
    'voex', 'poezs', 'poeh', 'poehh', 'vuh', 'vui', 'vuix', 'vuizs', 'vun', 'vuny', 'vunw', 'vunx', 'vunzs', 'vut', 'vutt',

    'za', 'zay', 'zaw', 'zah', 'zahh', 'zai', 'zaiy', 'zaiw', 'zaix', 'zaizs', 'zainny', 'zak', 'zakk', 'zam', 'zamy', 'zamw',
    'zamzs', 'zan', 'zany', 'zanw', 'zanx', 'zanzs', 'zang', 'zangy', 'zangw', 'zangx', 'zanny', 'zannzs', 'zapp', 'zat', 'zatt',
    'zau', 'zauy', 'zauw', 'zaux', 'zauzs', 'ze', 'zey', 'zew', 'zex', 'zezs', 'zeh', 'zehh', 'zenn', 'zenny', 'zennw', 'zennzs',
    'zi', 'ziy', 'ziw', 'zix', 'zizs', 'zia', 'ziay', 'ziaw', 'ziazs', 'ziah', 'ziahh', 'ziam', 'ziamw', 'ziamx', 'ziamzs', 'zien',
    'zieny', 'zienw', 'zienx', 'zienzs', 'ziang', 'ziangy', 'ziangw', 'ziann', 'zianny', 'ziannw', 'ziannx', 'ziannzs', 'ziap',
    'ziapp', 'ziet', 'ziett', 'ziau', 'ziauy', 'ziauw', 'ziaux', 'zih', 'zihh', 'zek', 'zekk', 'zim', 'zimy', 'zimw', 'zimx', 'zin',
    'ziny', 'zinw', 'zinx', 'zinzs', 'zeng', 'zengy', 'zengw', 'zengx', 'zengzs', 'zinn', 'zinny', 'zinnw', 'zinnx', 'zinnzs',
    'ziur', 'ziury', 'ziurw', 'ziurh', 'ziurhh', 'ziok', 'ziong', 'ziongy', 'ziongw', 'ziongx', 'ziongzs', 'zip', 'zipp', 'zit',
    'zitt', 'ziu', 'ziuy', 'ziuw', 'ziuzs', 'ziunn', 'ziunny', 'ziunnw', 'ziunnzs', 'zng', 'zngy', 'zngw', 'zngx', 'zngzs', 'zur',
    'zury', 'zurw', 'zurx', 'zurzs', 'zurh', 'zok', 'zokk', 'zong', 'zongy', 'zongw', 'zongx', 'zongzs', 'zo', 'zoy', 'zozs', 'zu',
    'zuy', 'zuw', 'zux', 'zuxzs', 'zoay', 'zoax', 'zoazs', 'zoah', 'zoahh', 'zoainnzs', 'zoan', 'zoany', 'zoanw', 'zoanx', 'zoanzs',
    'zoann', 'zoanny', 'zoannw', 'zoannx', 'zoannzs', 'zutt', 'zoew', 'zoezs', 'zuh', 'zui', 'zuiy', 'zuiw', 'zuix', 'zuizs', 'zun',
    'zuny', 'zunw', 'zunx', 'zunzs', 'zut', 'zutt', 

]