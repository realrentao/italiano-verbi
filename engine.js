

        // ==================== MOOD GROUPS ====================
        const moodGroups = [
            { key: "indicativo", label: "直陈式 Indicativo", icon: "📊", color: "#1E5AA8",
              rowBreak: 4, // split 8 columns into 2 rows of 4
              tenses: [
                {key: "presente",       label: "现在时"},
                {key: "passato",        label: "近过去时"},
                {key: "imperfetto",     label: "未完成过去时"},
                {key: "trapassato",     label: "近愈过去时"},
                {key: "remoto",         label: "远过去时"},
                {key: "trapassato_remoto", label: "远愈过去时"},
                {key: "futuro",         label: "简单将来时"},
                {key: "futuro_anteriore", label: "先将来时"}
              ]},
            { key: "congiuntivo", label: "虚拟式 Congiuntivo", icon: "🔷", color: "#2E7D32",
              tenses: [
                {key: "congiuntivo",     label: "现在时"},
                {key: "cong_passato",    label: "近过去时"},
                {key: "cong_imperfetto", label: "未完成过去时"},
                {key: "cong_trapassato", label: "近愈过去时"}
              ]},
            { key: "condizionale", label: "条件式 Condizionale", icon: "🔶", color: "#E65100",
              tenses: [
                {key: "condizionale",  label: "现在时"},
                {key: "cond_passato",  label: "过去时"}
              ]},
            { key: "imperativo", label: "命令式 Imperativo", icon: "⚡", color: "#6A1B9A",
              tenses: [
                {key: "imperativo", label: "现在时"}
              ]},
            { key: "infinito", label: "不定式 Infinito", icon: "📝", color: "#C62828",
              tenses: [
                {key: "infinito",        label: "现在时"},
                {key: "infinito_passato", label: "过去时"}
              ]},
            { key: "gerundio", label: "副动词 Gerundio", icon: "🔄", color: "#00838F",
              tenses: [
                {key: "gerundio",        label: "现在时"},
                {key: "gerundio_passato", label: "过去时"}
              ]},
            { key: "participio", label: "分词 Participio", icon: "🏷️", color: "#EF6C00",
              tenses: [
                {key: "participio_pres", label: "现在分词"},
                {key: "participio_pass", label: "过去分词"}
              ]}
        ];
        const pronouns = ["Io", "Tu", "Lui/Lei", "Noi", "Voi", "Loro"];
        // ==================== STATE ====================
        let currentLetter = null;
        let currentVerb = null;
        // ==================== INIT ====================
        function init() {
            // Hide loading indicator now that data is parsed
            const loadStatus = document.getElementById('loadStatus');
            if (loadStatus) loadStatus.style.display = 'none';
            fillAllVerbTenses();
            renderAlphaIndex();
            selectLetter('a');
        }
        // ==================== CONJUGATION ENGINE ====================
        // Automatically generates all 21 tenses for every verb based on its type.

            // Manually defined tenses (e.g. essere) are preserved.
        const AUX = {
            "avere": {
                pres:["ho","hai","ha","abbiamo","avete","hanno"],
                imperf:["avevo","avevi","aveva","avevamo","avevate","avevano"],
                rem:["ebbi","avesti","ebbe","avemmo","aveste","ebbero"],
                fut:["avrò","avrai","avrà","avremo","avrete","avranno"],
                cong:["abbia","abbia","abbia","abbiamo","abbiate","abbiano"],
                cong_imp:["avessi","avessi","avesse","avessimo","aveste","avessero"],
                cond:["avrei","avresti","avrebbe","avremmo","avreste","avrebbero"],
                gerundio: "avendo",
            },
            "essere": {
                pres:["sono","sei","è","siamo","siete","sono"],
                imperf:["ero","eri","era","eravamo","eravate","erano"],
                rem:["fui","fosti","fu","fummo","foste","furono"],
                fut:["sarò","sarai","sarà","saremo","sarete","saranno"],
                cong:["sia","sia","sia","siamo","siate","siano"],
                cong_imp:["fossi","fossi","fosse","fossimo","foste","fossero"],
                cond:["sarei","saresti","sarebbe","saremmo","sareste","sarebbero"],
                gerundio: "essendo",
            }
        };
        // Verb metadata: type, stem, aux, pp
        const VCONJ = {
            // A

    "avvicinare":  {type:"are", stem:"avvicin", aux:"avere", pp:"avvicinato"},
    "avvicinarsi": {type:"are-rfl", stem:"avvicin", aux:"essere", pp:"avvicinato"},
    "accarezzare": {type:"are", stem:"accarezz", aux:"avere", pp:"accarezzato"},            "abbracciare": {type:"iare", stem:"abbracci", aux:"avere", pp:"abbracciato"},
            "abitare":    {type:"are", stem:"abit", aux:"avere", pp:"abitato"},
            "abituare":    {type:"are", stem:"abitu", aux:"avere", pp:"abituato"},
            "abituarsi":    {type:"are-rfl", stem:"abitu", aux:"essere", pp:"abituato"},
            "accendere":  {type:"ere", stem:"accend", aux:"avere", pp:"acceso", rem:["accesi","accendesti","accese","accendemmo","accendeste","accesero"]},
            "accendersi": {type:"irr"},
            "accennare":   {type:"are", stem:"accenn", aux:"avere", pp:"accennato"},
            "accettare":  {type:"are", stem:"accett", aux:"avere", pp:"accettato"},
            "accettarsi": {type:"are-rfl", stem:"accett", aux:"essere", pp:"accettato"},
            "accogliere":   {type:"ere", stem:"accogli", aux:"avere", pp:"accolto", pres:["accolgo","accogli","accoglie","accogliamo","accogliete","accolgono"], rem:["accolsi","accogliesti","accolse","accogliemmo","accoglieste","accolsero"]},
            "accompagnare":{type:"are", stem:"accompagn", aux:"avere", pp:"accompagnato"},
            "accontentare":{type:"are", stem:"accontent", aux:"avere", pp:"accontentato"},
            "accorgersi": {type:"irr"},
"accorgere":  {type:"ere", stem:"accorg", aux:"avere", pp:"accorto", rem:["accorsi","accorgesti","accorse","accorgemmo","accorgeste","accorsero"]},
            "addormentare":{type:"are", stem:"addorment", aux:"avere", pp:"addormentato"},
            "addormentarsi":{type:"are-rfl", stem:"addorment", aux:"essere", pp:"addormentato"},
            "adorare":     {type:"are", stem:"ador", aux:"avere", pp:"adorato"},
            "affittare":    {type:"are", stem:"affitt", aux:"avere", pp:"affittato"},
            "affrontare":  {type:"are", stem:"affront", aux:"avere", pp:"affrontato"},
            "agire":        {type:"ire-isc", stem:"ag", aux:"avere", pp:"agito"},
            "aggiornare":   {type:"are", stem:"aggiorn", aux:"avere", pp:"aggiornato"},
            "aiutare":    {type:"are", stem:"aiut", aux:"avere", pp:"aiutato"},
            "allontanarsi": {type:"are-rfl", stem:"allontan", aux:"essere", pp:"allontanato"},
"allontanare":{type:"are", stem:"allontan", aux:"avere", pp:"allontanato"},
            "alzarsi":    {type:"are-rfl", stem:"alz", aux:"essere", pp:"alzato"},
            "alzare":     {type:"are", stem:"alz", aux:"avere", pp:"alzato"},
            "amare":      {type:"are", stem:"am", aux:"avere", pp:"amato"},
            "ammettere":    {type:"ere", stem:"ammett", aux:"avere", pp:"ammesso", rem:["ammisi","ammettesti","ammise","ammettemmo","ammetteste","ammisero"]},
            "analizzare":  {type:"are", stem:"analizz", aux:"avere", pp:"analizzato"},
            "andare":     {type:"irr"},
            "apparire":     {type:"ire-isc", stem:"appar", aux:"essere", pp:"apparso"},
            "appartenere":  {type:"ere", stem:"apparten", aux:"essere", pp:"appartenuto", pres:["appartengo","appartieni","appartiene","apparteniamo","appartenete","appartengono"], rem:["appartenni","appartenesti","appartenne","appartenemmo","apparteneste","appartenero"]},
            "applicare":   {type:"care", stem:"applic", aux:"avere", pp:"applicato"},
            "apprezzare":  {type:"are", stem:"apprezz", aux:"avere", pp:"apprezzato"},
            "approfittare": {type:"are", stem:"approfitt", aux:"avere", pp:"approfittato"},
            "aprire":     {type:"ire", stem:"apr", aux:"avere", pp:"aperto", pres:["apro","apri","apre","apriamo","aprite","aprono"]},
            "arrabbiarsi":{type:"are-rfl", stem:"arrabbi", aux:"essere", pp:"arrabbiato"},
"arrabbiare": {type:"iare", stem:"arrabbi", aux:"avere", pp:"arrabbiato"},
            "arrivare":   {type:"are", stem:"arriv", aux:"essere", pp:"arrivato"},
            "ascoltare":  {type:"are", stem:"ascolt", aux:"avere", pp:"ascoltato"},
            "aspettare":  {type:"are", stem:"aspett", aux:"avere", pp:"aspettato"},
            "aspettarsi": {type:"are-rfl", stem:"aspett", aux:"essere", pp:"aspettato"},
            "assaggiare": {type:"iare", stem:"assaggi", aux:"avere", pp:"assaggiato"},
            "assicurare":   {type:"are", stem:"assicur", aux:"avere", pp:"assicurato"},
            "assistere":   {type:"ere", stem:"assist", aux:"avere", pp:"assistito"},
            "attraversare": {type:"are", stem:"attravers", aux:"avere", pp:"attraversato"},
            "augurare":    {type:"are", stem:"augur", aux:"avere", pp:"augurato"},
            "aumentare":    {type:"are", stem:"aument", aux:"essere", pp:"aumentato"},
            "avanzare":     {type:"are", stem:"avanz", aux:"avere", pp:"avanzato"},
            "avere":      {type:"irr"},
            "avvenire":    {type:"irr"},
            "abbracciarsi":{type:"are-rfl", stem:"abbracci", aux:"essere", pp:"abbracciato"},
            "adoperarsi": {type:"are-rfl", stem:"adoper", aux:"essere", pp:"adoperato"},
            "accontentarsi":{type:"are-rfl", stem:"accontent", aux:"essere", pp:"accontentato"},
            // B
            "bagnarsi":   {type:"are-rfl", stem:"bagn", aux:"essere", pp:"bagnato"},
            "bagnare":    {type:"are", stem:"bagn", aux:"avere", pp:"bagnato"},
            "ballare":    {type:"are", stem:"ball", aux:"avere", pp:"ballato"},
            "bastare":    {type:"are", stem:"bast", aux:"essere", pp:"bastato"},
            "bere":       {type:"irr"},
            "brillare":   {type:"are", stem:"brill", aux:"avere", pp:"brillato"},
            "brontolare": {type:"are", stem:"brontol", aux:"avere", pp:"brontolato"},
            "bussare":    {type:"are", stem:"buss", aux:"avere", pp:"bussato"},
            "buttare":    {type:"are", stem:"butt", aux:"avere", pp:"buttato"},
            // C
            "camminare":  {type:"are", stem:"cammin", aux:"avere", pp:"camminato"},
            "cacciarsi":   {type:"irr"},
            "cantare":    {type:"are", stem:"cant", aux:"avere", pp:"cantato"},
            "capire":     {type:"ire-isc", stem:"cap", aux:"avere", pp:"capito"},
            "cercare":    {type:"care", stem:"cerc", aux:"avere", pp:"cercato"},
            "chiamare":   {type:"are", stem:"chiam", aux:"avere", pp:"chiamato"},
            "chiudere":   {type:"ere", stem:"chiud", aux:"avere", pp:"chiuso", rem:["chiusi","chiudesti","chiuse","chiudemmo","chiudeste","chiusero"]},
            "cominciare": {type:"iare", stem:"cominci", aux:"essere", pp:"cominciato"},
            "comprare":   {type:"are", stem:"compr", aux:"avere", pp:"comprato"},
            "conoscere":  {type:"ere", stem:"conosc", aux:"avere", pp:"conosciuto", pres:["conosco","conosci","conosce","conosciamo","conoscete","conoscono"]},
            "correre":    {type:"ere", stem:"corr", aux:"essere", pp:"corso", rem:["corsi","corresti","corse","corremmo","correste","corsero"]},
            "cucinare":   {type:"are", stem:"cucin", aux:"avere", pp:"cucinato"},
            // C 补充
            "cambiare":   {type:"iare", stem:"cambi", aux:"avere", pp:"cambiato"},
            "cancellare":    {type:"are", stem:"cancell", aux:"avere", pp:"cancellato"},
            "chiacchierare": {type:"are", stem:"chiacchier", aux:"avere", pp:"chiacchierato"},
            "chiedere":   {type:"ere", stem:"chied", aux:"avere", pp:"chiesto", rem:["chiesi","chiedesti","chiese","chiedemmo","chiedeste","chiesero"]},
            "collaborare":   {type:"are", stem:"collabor", aux:"avere", pp:"collaborato"},
            "combinare":    {type:"are", stem:"combin", aux:"avere", pp:"combinato"},
            "comportarsi":  {type:"are-rfl", stem:"comport", aux:"essere", pp:"comportato"},
            "comportare": {type:"are", stem:"comport", aux:"avere", pp:"comportato"},
            "comunicare":    {type:"care", stem:"comunic", aux:"avere", pp:"comunicato"},
            "concedere":     {type:"ere", stem:"conced", aux:"avere", pp:"concesso", rem:["concessi","concedesti","concesse","concedemmo","concedeste","concessero"]},
            "confondersi":  {type:"irr"},
            "considerare":   {type:"are", stem:"consider", aux:"avere", pp:"considerato"},
            "consultare":   {type:"are", stem:"consult", aux:"avere", pp:"consultato"},
            "contenere":     {type:"irr"},
            "continuare": {type:"are", stem:"continu", aux:"avere", pp:"continuato"},
            "controllare":  {type:"are", stem:"controll", aux:"avere", pp:"controllato"},
            "convincere":    {type:"ere", stem:"convinc", aux:"avere", pp:"convinto", rem:["convinsi","convincesti","convinse","convincemmo","convinveste","convinsero"]},
            "correggere":    {type:"ere", stem:"corregg", aux:"avere", pp:"corretto", pres:["correggo","correggi","corregge","correggiamo","correggete","correggono"], rem:["corressi","correggesti","corresse","correggemmo","correggeste","corressero"]},
            "corrugare":    {type:"care", stem:"corrug", aux:"avere", pp:"corrugato"},
            "creare":        {type:"are", stem:"cre", aux:"avere", pp:"creato"},
            "crescere":   {type:"ere", stem:"cresc", aux:"essere", pp:"cresciuto", rem:["crebbi","crescesti","crebbe","crescemmo","cresceste","crebbero"]},
            "cucire":       {type:"ire", stem:"cuc", aux:"avere", pp:"cucito"},
            "cuocere":       {type:"ere", stem:"cuoc", aux:"avere", pp:"cotto", pres:["cuocio","cuoci","cuoce","cuociamo","cuocete","cuociono"], rem:["cossi","cuocesti","cosse","cuocemmo","cuoceste","cossero"]},
            "curare":        {type:"are", stem:"cur", aux:"avere", pp:"curato"},
            "comparare":   {type:"are", stem:"compar", aux:"avere", pp:"comparato"},
            "compararsi":  {type:"are-rfl", stem:"compar", aux:"essere", pp:"comparato"},
            "comparire":    {type:"ire-isc", stem:"compar", aux:"essere", pp:"comparso", pres:["compaio","comparisci","compare","compariamo","comparite","compaiono"]},
            "cosatare":   {type:"are", stem:"cosat", aux:"avere", pp:"cosatato"},
            // D

    "dirige":     {type:"ere", stem:"dirig", aux:"avere", pp:"diretto", pres:["dirigo","dirigi","dirige","dirigiamo","dirigete","dirigono"]},            "dare":       {type:"irr"},
            "decidere":   {type:"ere", stem:"decid", aux:"avere", pp:"deciso", rem:["decisi","decidesti","decise","decidemmo","decideste","decisero"]},
            "depilarsi":  {type:"are-rfl", stem:"depil", aux:"essere", pp:"depilato"},
"depilare":   {type:"are", stem:"depil", aux:"avere", pp:"depilato"},
            "descrivere": {type:"ere", stem:"descriv", aux:"avere", pp:"descritto", pres:["descrivo","descrivi","descrive","descriviamo","descrivete","descrivono"], rem:["descrisi","descrivesti","descrisse","descrivemmo","descriveste","descrisero"]},
            "dire":       {type:"irr"},
            "dirigersi":   {type:"ere-rfl", stem:"dirig", aux:"essere", pp:"diretto", pres:["dirigo","dirigi","dirige","dirigiamo","dirigete","dirigono"], rem:["diressi","dirigesti","diresse","dirigemmo","dirigeste","diressero"]},
            "dissuadere":  {type:"ere", stem:"dissuad", aux:"avere", pp:"dissuaso", rem:["dissuasi","dissuadesti","dissuase","dissuademmo","dissuadeste","dissuasero"]},
            "divertirsi": {type:"irr"}, // manually defined
"divertire":  {type:"ire", stem:"divert", aux:"avere", pp:"divertito"},
            "dormire":    {type:"ire", stem:"dorm", aux:"avere", pp:"dormito"},
            "dovere":     {type:"irr"},
            // E
            "essere":     {type:"irr"},
            "essersi":    {type:"irr"},
            // E 补充
            "educare":     {type:"care", stem:"educ", aux:"avere", pp:"educato"},
            "elaborare":   {type:"are", stem:"elabor", aux:"avere", pp:"elaborato"},
            "emergere":    {type:"ere", stem:"emerg", aux:"essere", pp:"emerso", rem:["emersi","emergesti","emerse","emergemmo","emergeste","emersero"]},
            "entrare":    {type:"are", stem:"entr", aux:"essere", pp:"entrato"},
            "escludere":   {type:"ere", stem:"esclud", aux:"avere", pp:"escluso", rem:["esclusi","escludesti","escluse","escludemmo","escludeste","esclusero"]},
            "esistere":    {type:"ere", stem:"esist", aux:"essere", pp:"esistito"},
            "esprimere":   {type:"ere", stem:"esprim", aux:"avere", pp:"espresso", rem:["espressi","esprimesti","espresse","esprimemmo","esprimeste","espressero"]},
            "evitare":     {type:"are", stem:"evit", aux:"avere", pp:"evitato"},
            // F

    "fiutare":     {type:"are", stem:"fiut", aux:"avere", pp:"fiutato"},            "fare":       {type:"irr"},
            "fermare":    {type:"are", stem:"ferm", aux:"avere", pp:"fermato"},
            "fermarsi":   {type:"are-rfl", stem:"ferm", aux:"essere", pp:"fermato"},
            "festeggiare": {type:"iare", stem:"festeggi", aux:"avere", pp:"festeggiato"},
            "fidarsi":       {type:"are-rfl", stem:"fid", aux:"essere", pp:"fidato"},
            "fidare":        {type:"are", stem:"fid", aux:"avere", pp:"fidato"},
            "fingersi":     {type:"irr"},
            "finire":     {type:"ire-isc", stem:"fin", aux:"avere", pp:"finito"},
            "firmare":       {type:"are", stem:"firm", aux:"avere", pp:"firmato"},
            "fissare":    {type:"are", stem:"fiss", aux:"avere", pp:"fissato"},
            "fornire":       {type:"ire-isc", stem:"forn", aux:"avere", pp:"fornito"},
            "fotografare":   {type:"are", stem:"fotograf", aux:"avere", pp:"fotografato"},
            "frequentare": {type:"are", stem:"frequent", aux:"avere", pp:"frequentato"},
            "fumare":        {type:"are", stem:"fum", aux:"avere", pp:"fumato"},
            "funzionare":    {type:"are", stem:"funzion", aux:"avere", pp:"funzionato"},
            // G
            "galleggiare":   {type:"iare", stem:"galleggi", aux:"avere", pp:"galleggiato"},
            "gestire":       {type:"ire-isc", stem:"gest", aux:"avere", pp:"gestito"},
            "giocare":    {type:"care", stem:"gioc", aux:"avere", pp:"giocato"},
            "godere":      {type:"irr"},
            "gradire":     {type:"ire-isc", stem:"grad", aux:"avere", pp:"gradito"},
            "guardare":   {type:"are", stem:"guard", aux:"avere", pp:"guardato"},
            "guidare":       {type:"are", stem:"guid", aux:"avere", pp:"guidato"},
            "gustare":       {type:"are", stem:"gust", aux:"avere", pp:"gustato"},
            // I
            "imparare":   {type:"are", stem:"impar", aux:"avere", pp:"imparato"},
            "incontrare": {type:"are", stem:"incontr", aux:"avere", pp:"incontrato"},
            "informarsi": {type:"are-rfl", stem:"inform", aux:"essere", pp:"informato"},
            "informare":  {type:"are", stem:"inform", aux:"avere", pp:"informato"},
            "insegnare":  {type:"are", stem:"insegn", aux:"avere", pp:"insegnato"},
            "interessare":{type:"are", stem:"interess", aux:"avere", pp:"interessato"},
            "iscriversi":  {type:"ere-rfl", stem:"iscriv", aux:"essere", pp:"iscritto", rem:["iscrissi","iscrivesti","iscrisse","iscrivemmo","iscriveste","iscrissero"]},
"iscrivere":  {type:"ere", stem:"iscriv", aux:"avere", pp:"iscritto", pres:["iscrivo","iscrivi","iscrive","iscriviamo","iscrivete","iscrivono"], rem:["iscrissi","iscrivesti","iscrisse","iscrivemmo","iscriveste","iscrissero"]},
            // I 补充
            "immaginare":    {type:"are", stem:"immagin", aux:"avere", pp:"immaginato"},
            "impedire":      {type:"ire-isc", stem:"imped", aux:"avere", pp:"impedito"},
            "impiantare":    {type:"are", stem:"impiant", aux:"avere", pp:"impiantato"},
            "indicare":     {type:"care", stem:"indic", aux:"avere", pp:"indicato"},
            "indossare":     {type:"are", stem:"indoss", aux:"avere", pp:"indossato"},
            "infilarsi":   {type:"are-rfl", stem:"infil", aux:"essere", pp:"infilato"},
            "ingoiare":     {type:"iare", stem:"ingoi", aux:"avere", pp:"ingoiato"},
            "ingannare":    {type:"are", stem:"ingann", aux:"avere", pp:"ingannato"},
            "ingannarsi":   {type:"are-rfl", stem:"ingann", aux:"essere", pp:"ingannato"},
            "ignorare":     {type:"are", stem:"ignor", aux:"avere", pp:"ignorato"},
            "iniziare":   {type:"iare", stem:"inizi", aux:"avere", pp:"iniziato"},
            "inserire":      {type:"ire-isc", stem:"inser", aux:"avere", pp:"inserito"},
            "insistere":     {type:"ere", stem:"insist", aux:"avere", pp:"insistito"},
            "inventare":     {type:"are", stem:"invent", aux:"avere", pp:"inventato"},
            "investire":     {type:"ire", stem:"invest", aux:"avere", pp:"investito"},
            "invitare":   {type:"are", stem:"invit", aux:"avere", pp:"invitato"},
            "impiegare":  {type:"care", stem:"impieg", aux:"avere", pp:"impiegato"},
            "impiegarsi": {type:"irr"},
            // L
            "lamentarsi":    {type:"are-rfl", stem:"lament", aux:"essere", pp:"lamentato"},
            "lamentare":     {type:"are", stem:"lament", aux:"avere", pp:"lamentato"},
            "lanciare":      {type:"iare", stem:"lanci", aux:"avere", pp:"lanciato"},
            "lasciare":   {type:"iare", stem:"lasci", aux:"avere", pp:"lasciato"},
            "lavare":     {type:"are", stem:"lav", aux:"avere", pp:"lavato"},
            "lavarsi":    {type:"are-rfl", stem:"lav", aux:"essere", pp:"lavato"},
            "lavorare":   {type:"are", stem:"lavor", aux:"avere", pp:"lavorato"},
            "leggere":    {type:"ere", stem:"legg", aux:"avere", pp:"letto", pres:["leggo","leggi","legge","leggiamo","leggete","leggono"], rem:["lessi","leggesti","lesse","leggemmo","leggeste","lessero"]},
            "liberare":      {type:"are", stem:"liber", aux:"avere", pp:"liberato"},
            "litigare":      {type:"care", stem:"litig", aux:"avere", pp:"litigato"},
            "lodare":        {type:"are", stem:"lod", aux:"avere", pp:"lodato"},
            "lottare":       {type:"are", stem:"lott", aux:"avere", pp:"lottato"},
            // M
            "mancare":    {type:"care", stem:"manc", aux:"essere", pp:"mancato"},
            "mangiare":   {type:"iare", stem:"mangi", aux:"avere", pp:"mangiato"},
            "mangiarsi":   {type:"irr"},
            "mantenere":   {type:"irr"},
            "mentire":     {type:"ire", stem:"ment", aux:"avere", pp:"mentito"},
            "meritare":    {type:"are", stem:"merit", aux:"avere", pp:"meritato"},
            "mettersi":   {type:"irr"},
"mettere":    {type:"ere", stem:"mett", aux:"avere", pp:"messo", rem:["misi","mettesti","mise","mettemmo","metteste","misero"]},
            "migliorare":  {type:"are", stem:"miglior", aux:"avere", pp:"migliorato"},
            "moderare":    {type:"are", stem:"moder", aux:"avere", pp:"moderato"},
            "monitorare":  {type:"are", stem:"monitor", aux:"avere", pp:"monitorato"},
            "morire":     {type:"irr"},
            "mostrare":    {type:"are", stem:"mostr", aux:"avere", pp:"mostrato"},
            "muovere":     {type:"ere", stem:"muov", aux:"avere", pp:"mosso", rem:["mossi","muovesti","mosse","muovemmo","muoveste","mossero"]},
            // N
            "nascere":    {type:"ere", stem:"nasc", aux:"essere", pp:"nato", rem:["nacqui","nascesti","nacque","nascemmo","nasceste","nacquero"]},
            "nascondere":   {type:"ere", stem:"nascond", aux:"avere", pp:"nascosto", rem:["nascosi","nascondesti","nascose","nascondemmo","nascondeste","nascosero"]},
            "navigare":     {type:"care", stem:"navig", aux:"avere", pp:"navigato"},
            "notare":       {type:"are", stem:"not", aux:"avere", pp:"notato"},
            "nuotare":    {type:"are", stem:"nuot", aux:"avere", pp:"nuotato"},
            // O
            "occupare":     {type:"are", stem:"occup", aux:"avere", pp:"occupato"},
            "odiare":       {type:"iare", stem:"odi", aux:"avere", pp:"odiato"},
            "offrire":    {type:"ire", stem:"offr", aux:"avere", pp:"offerto", rem:["offersi","offristi","offerse","offrimmo","offriste","offersero"]},
            "offendersi":   {type:"irr"},
            "operare":      {type:"are", stem:"oper", aux:"avere", pp:"operato"},
            "ordinare":   {type:"are", stem:"ordin", aux:"avere", pp:"ordinato"},
            "organizzare":{type:"are", stem:"organizz", aux:"avere", pp:"organizzato"},
            "osservare":  {type:"are", stem:"osserv", aux:"avere", pp:"osservato"},
            "ostinarsi":    {type:"are-rfl", stem:"ostin", aux:"essere", pp:"ostinato"},
"ostinare":   {type:"are", stem:"ostin", aux:"avere", pp:"ostinato"},
            "ottenere":   {type:"irr"},
            // P

    "piuttostare": {type:"are", stem:"piuttost", aux:"avere", pp:"piuttostato"},            "pagare":     {type:"care", stem:"pag", aux:"avere", pp:"pagato"},
            "partire":    {type:"ire", stem:"part", aux:"essere", pp:"partito"},
            "passare":    {type:"are", stem:"pass", aux:"avere", pp:"passato"},
            "pensare":    {type:"are", stem:"pens", aux:"avere", pp:"pensato"},
            "perdere":    {type:"ere", stem:"perd", aux:"avere", pp:"perso", rem:["persi","perdesti","perse","perdemmo","perdeste","persero"]},
            "permettere": {type:"ere", stem:"permett", aux:"avere", pp:"permesso", rem:["permisi","permettesti","permise","permettemmo","permetteste","permisero"]},
            "piacere":    {type:"irr"},
            "piovere":    {type:"ere", stem:"piov", aux:"essere", pp:"piovuto"},
            "portare":    {type:"are", stem:"port", aux:"avere", pp:"portato"},
            "prendere":   {type:"ere", stem:"prend", aux:"avere", pp:"preso", rem:["presi","prendesti","prese","prendemmo","prendeste","presero"]},
            "prendersi":   {type:"irr"},
            "prenotare":  {type:"are", stem:"prenot", aux:"avere", pp:"prenotato"},
            "preoccuparsi":{type:"are-rfl", stem:"preoccup", aux:"essere", pp:"preoccupato"},
            "prepararsi": {type:"are-rfl", stem:"prepar", aux:"essere", pp:"preparato"},
"preparare":  {type:"are", stem:"prepar", aux:"avere", pp:"preparato"},
            "presentare": {type:"are", stem:"present", aux:"avere", pp:"presentato"},
            "promettere": {type:"ere", stem:"promett", aux:"avere", pp:"promesso", rem:["promisi","promettesti","promise","promettemmo","prometteste","promisero"]},
            "provare":    {type:"are", stem:"prov", aux:"avere", pp:"provato"},
            "pulire":     {type:"ire-isc", stem:"pul", aux:"avere", pp:"pulito"},
            // P 补充
            "partecipare":{type:"are", stem:"partecip", aux:"avere", pp:"partecipato"},
            "pedinare":   {type:"are", stem:"pedin", aux:"avere", pp:"pedinato"},
            "passeggiare":    {type:"iare", stem:"passeggi", aux:"avere", pp:"passeggiato"},
            "pesare":         {type:"are", stem:"pes", aux:"avere", pp:"pesato"},
            "piangere":       {type:"ere", stem:"piang", aux:"avere", pp:"pianto", rem:["piansi","piangesti","pianse","piangemmo","piangeste","piansero"]},
            "porre":       {type:"irr"},
            "possedere":      {type:"ere", stem:"possed", aux:"avere", pp:"posseduto", pres:["possiedo","possiedi","possiede","possediamo","possedete","possiedono"]},
            "praticare":   {type:"care", stem:"pratic", aux:"avere", pp:"praticato"},
            "preferire":  {type:"ire-isc", stem:"prefer", aux:"avere", pp:"preferito"},
            "precipitarsi": {type:"are-rfl", stem:"precipit", aux:"essere", pp:"precipitato"},
            "pregare":        {type:"care", stem:"preg", aux:"avere", pp:"pregato"},
            "prelevare":     {type:"are", stem:"prelev", aux:"avere", pp:"prelevato"},
            "preoccupare":    {type:"are", stem:"preoccup", aux:"avere", pp:"preoccupato"},
            "produrre":       {type:"irr"},
            "pronunciare":    {type:"iare", stem:"pronunci", aux:"avere", pp:"pronunciato"},
            "proporre":       {type:"irr"},
            "proteggere": {type:"ere", stem:"protegg", aux:"avere", pp:"protetto", pres:["proteggo","proteggi","protegge","proteggiamo","proteggete","proteggono"], rem:["protessi","proteggesti","protesse","proteggemmo","proteggeste","protessero"]},
            "pubblicare":     {type:"care", stem:"pubblic", aux:"avere", pp:"pubblicato"},
            "prestare":    {type:"are", stem:"prest", aux:"avere", pp:"prestato"},
            "prestarsi":   {type:"are-rfl", stem:"prest", aux:"essere", pp:"prestato"},
            // R

    "riportare":    {type:"are", stem:"riport", aux:"avere", pp:"riportato"},
    "riuscire": {type:"irr", stem:"", aux:"essere", pp:""},            "regalare":   {type:"are", stem:"regal", aux:"avere", pp:"regalato"},
            "rendere":     {type:"ere", stem:"rend", aux:"avere", pp:"reso", rem:["resi","rendesti","rese","rendemmo","rendeste","resero"]},
            "restare":    {type:"are", stem:"rest", aux:"essere", pp:"restato"},
            "ricevere":   {type:"ere", stem:"ricev", aux:"avere", pp:"ricevuto"},
            "ricordare":  {type:"are", stem:"ricord", aux:"avere", pp:"ricordato"},
            "rilassarsi": {type:"are-rfl", stem:"rilass", aux:"essere", pp:"rilassato"},
            "rilassare":  {type:"are", stem:"rilass", aux:"avere", pp:"rilassato"},
            "rimanere":   {type:"irr"},
            "rimangiare":  {type:"iare", stem:"rimangi", aux:"avere", pp:"rimangiato"},
            "rimangiarsi": {type:"irr"},
            "ringraziare":{type:"iare", stem:"ringrazi", aux:"avere", pp:"ringraziato"},
            "ripetere":   {type:"ere", stem:"ripet", aux:"avere", pp:"ripetuto"},
            "rispondere": {type:"ere", stem:"rispond", aux:"avere", pp:"risposto", rem:["risposi","rispondesti","rispose","rispondemmo","rispondeste","risposero"]},
            // R 补充
            "raccontare": {type:"are", stem:"raccont", aux:"avere", pp:"raccontato"},
            "rapinare":    {type:"are", stem:"rapin", aux:"avere", pp:"rapinato"},
            "ridere":     {type:"ere", stem:"rid", aux:"avere", pp:"riso", rem:["risi","ridesti","rise","ridemmo","rideste","risero"]},
            "riferire":   {type:"ire-isc", stem:"rifer", aux:"avere", pp:"riferito"},
            "rompere":    {type:"ere", stem:"romp", aux:"avere", pp:"rotto", rem:["ruppi","rompesti","ruppe","rompemmo","rompeste","ruppero"]},
            // R 补充
            "rifiutare":  {type:"are", stem:"rifiut", aux:"avere", pp:"rifiutato"},
            "riprendere": {type:"ere", stem:"riprend", aux:"avere", pp:"ripreso", rem:["ripresi","riprendesti","riprese","riprendemmo","riprendeste","ripresero"]},
            "risolvere":  {type:"ere", stem:"risolv", aux:"avere", pp:"risolto", rem:["risolsi","risolvesti","risolse","risolvemmo","risolveste","risolsero"]},
            "rispettare": {type:"are", stem:"rispett", aux:"avere", pp:"rispettato"},
            "risultare":  {type:"are", stem:"risult", aux:"essere", pp:"risultato"},
            "ritirare":   {type:"are", stem:"ritir", aux:"avere", pp:"ritirato"},
            "rivelare":   {type:"are", stem:"rivel", aux:"avere", pp:"rivelato"},
            "rovinare":   {type:"are", stem:"rovin", aux:"avere", pp:"rovinato"},
            "restituire": {type:"ire-isc", stem:"restitu", aux:"avere", pp:"restituito"},
            "rimborsare": {type:"are", stem:"rimbors", aux:"avere", pp:"rimborsato"},
            "richiedere": {type:"ere", stem:"richied", aux:"avere", pp:"richiesto", rem:["richiesi","richiedesti","richiese","richiedemmo","richiedeste","richiesero"]},
            // S

    "spazientirsi": {type:"irr"},
    "sfuggire":    {type:"ire", stem:"sfugg", aux:"avere", pp:"sfuggito"},            "salire":      {type:"irr"},
            "saltare":    {type:"are", stem:"salt", aux:"avere", pp:"saltato"},
            "sapere":     {type:"irr"},
            "sbagliare":  {type:"iare", stem:"sbagli", aux:"avere", pp:"sbagliato"},
            "scegliere":  {type:"ere", stem:"scegli", aux:"avere", pp:"scelto", pres:["scelgo","scegli","sceglie","scegliamo","scegliete","scelgono"], rem:["scelsi","scegliesti","scelse","scegliemmo","sceglieste","scelsero"]},
            "scherzare":  {type:"are", stem:"scherz", aux:"avere", pp:"scherzato"},
            "scusare":    {type:"are", stem:"scus", aux:"avere", pp:"scusato"},
            "sembrare":   {type:"are", stem:"sembr", aux:"essere", pp:"sembrato"},
            "sentire":    {type:"ire", stem:"sent", aux:"avere", pp:"sentito"},
            "sentirsi":   {type:"ire-rfl", stem:"sent", aux:"essere", pp:"sentito"},
            "servire":    {type:"ire", stem:"serv", aux:"avere", pp:"servito"},
            "soggiornare": {type:"are", stem:"soggiorn", aux:"avere", pp:"soggiornato"},
            "sorvegliare": {type:"are", stem:"sorvegli", aux:"avere", pp:"sorvegliato"},
            "sognare":    {type:"are", stem:"sogn", aux:"avere", pp:"sognato"},
            "spendere":   {type:"ere", stem:"spend", aux:"avere", pp:"speso", rem:["spesi","spendesti","spese","spendemmo","spendeste","spesero"]},
            "sperare":    {type:"are", stem:"sper", aux:"avere", pp:"sperato"},
            "sposare":    {type:"are", stem:"spos", aux:"avere", pp:"sposato"},
            "stare":      {type:"irr"},
            "studiare":   {type:"iare", stem:"studi", aux:"avere", pp:"studiato"},
            "succedere":  {type:"ere", stem:"succed", aux:"essere", pp:"successo", rem:["successi","succedesti","successe","succedemmo","succedeste","successero"]},
            "suonare":    {type:"are", stem:"suon", aux:"avere", pp:"suonato"},
            "sussurrare":  {type:"are", stem:"sussurr", aux:"avere", pp:"sussurrato"},
            "svegliarsi": {type:"are-rfl", stem:"svegli", aux:"essere", pp:"svegliato"},
            "svegliare":  {type:"iare", stem:"svegli", aux:"avere", pp:"svegliato"},
            // S 补充
            "salutare":   {type:"are", stem:"salut", aux:"avere", pp:"salutato"},
            "seguire":    {type:"ire", stem:"segu", aux:"avere", pp:"seguito"},
            "smettere":   {type:"ere", stem:"smett", aux:"avere", pp:"smesso", rem:["smisi","smettesti","smise","smettemmo","smetteste","smisero"]},
            "sistemare":   {type:"are", stem:"sistem", aux:"avere", pp:"sistemato"},
            "sorridere":  {type:"ere", stem:"sorrid", aux:"avere", pp:"sorriso", rem:["sorrisi","sorridesti","sorrise","sorridemmo","sorrideste","sorrisero"]},
            "spegnere":   {type:"ere", stem:"spegn", aux:"avere", pp:"spento", pres:["spengo","spegni","spegne","spegniamo","spegnete","spengono"], rem:["spensi","spegnesti","spense","spegnemmo","spegneste","spensero"]},
            // S 补充2
            "sbrigarsi":  {type:"are-rfl", stem:"sbrig", aux:"essere", pp:"sbrigato"},
            "sbrigare":   {type:"care", stem:"sbrig", aux:"avere", pp:"sbrigato"},
            "scappare":   {type:"are", stem:"scapp", aux:"essere", pp:"scappato"},
            "sciare":     {type:"iare", stem:"sci", aux:"avere", pp:"sciato"},
            "sciogliere": {type:"ere", stem:"sciogli", aux:"avere", pp:"sciolto", pres:["sciolgo","sciogli","scioglie","sciogliamo","sciogliete","sciolgono"], rem:["sciolsi","sciogliesti","sciolse","sciogliemmo","scioglieste","sciolsero"]},
            "scoppiare":  {type:"iare", stem:"scoppi", aux:"essere", pp:"scoppiato"},
            "scoprire":   {type:"ire", stem:"scopr", aux:"avere", pp:"scoperto", rem:["scopersi","scopristi","scoperse","scoprimmo","scopriste","scopersero"]},
            "scorrere":   {type:"ere", stem:"scorr", aux:"essere", pp:"scorso", rem:["scorsi","scorresti","scorse","scorremmo","scorreste","scorsero"]},
            "scottare":   {type:"are", stem:"scott", aux:"avere", pp:"scottato"},
            "scrivere":   {type:"ere", stem:"scriv", aux:"avere", pp:"scritto", pres:["scrivo","scrivi","scrive","scriviamo","scrivete","scrivono"], rem:["scrissi","scrivesti","scrisse","scrivemmo","scriveste","scrissero"]},
            "scusarsi":   {type:"are-rfl", stem:"scus", aux:"essere", pp:"scusato"},
            "sedersi":    {type:"irr"},
            "sedere":     {type:"irr"},
            "segnare":    {type:"are", stem:"segn", aux:"avere", pp:"segnato"},
            "selezionare":{type:"are", stem:"selezion", aux:"avere", pp:"selezionato"},
            "seppellire": {type:"ire-isc", stem:"seppell", aux:"avere", pp:"sepolto"},
            "significare":{type:"care", stem:"signific", aux:"avere", pp:"significato"},
            "simpatizzare":{type:"are", stem:"simpatizz", aux:"avere", pp:"simpatizzato"},
            "simulare":   {type:"are", stem:"simul", aux:"avere", pp:"simulato"},
            "soffrire":   {type:"ire", stem:"soffr", aux:"avere", pp:"sofferto", rem:["soffrii","soffristi","soffrì","soffrimmo","soffriste","soffrirono"]},
            "soffermarsi":{type:"are-rfl", stem:"sofferm", aux:"essere", pp:"soffermato"},
            "sostenere":  {type:"irr"},
            "sottare":    {type:"are", stem:"sott", aux:"avere", pp:"sottato"},
            "sotterrare": {type:"are", stem:"sotterr", aux:"avere", pp:"sotterrato"},
            "sottolineare":{type:"are", stem:"sottoline", aux:"avere", pp:"sottolineato"},
            "spaventare": {type:"are", stem:"spavent", aux:"avere", pp:"spaventato"},
            "spiegare":   {type:"care", stem:"spieg", aux:"avere", pp:"spiegato"},
            "spingere":   {type:"ere", stem:"sping", aux:"avere", pp:"spinto", rem:["spinsi","spingesti","spinse","spingemmo","spingeste","spinsero"]},
            "sposarsi":   {type:"are-rfl", stem:"spos", aux:"essere", pp:"sposato"},
            "stampare":   {type:"are", stem:"stamp", aux:"avere", pp:"stampato"},
            "stancare":   {type:"care", stem:"stanc", aux:"avere", pp:"stancato"},
            "stasare":    {type:"are", stem:"stas", aux:"avere", pp:"stasato"},
            "stendere":   {type:"ere", stem:"stend", aux:"avere", pp:"steso", rem:["stesi","stendesti","stese","stendemmo","stendeste","stesero"]},
            "stirare":    {type:"are", stem:"stir", aux:"avere", pp:"stirato"},
            "stupire":    {type:"ire-isc", stem:"stup", aux:"avere", pp:"stupito"},
            "suggerire":  {type:"ire-isc", stem:"sugger", aux:"avere", pp:"suggerito"},
            "svuotare":   {type:"are", stem:"svuot", aux:"avere", pp:"svuotato"},
            "sputare":    {type:"are", stem:"sput", aux:"avere", pp:"sputato"},
            "squillare":   {type:"are", stem:"squill", aux:"avere", pp:"squillato"},
            "spuntare":    {type:"are", stem:"spunt", aux:"avere", pp:"spuntato"},
            "spedire":    {type:"ire-isc", stem:"sped", aux:"avere", pp:"spedito"},
            // T
            "telefonare": {type:"are", stem:"telefon", aux:"avere", pp:"telefonato"},
            "tornare":    {type:"are", stem:"torn", aux:"essere", pp:"tornato"},
            "tradurre":   {type:"irr"},
            "trasferirsi":{type:"irr"},
"trasferire": {type:"ire-isc", stem:"trasfer", aux:"avere", pp:"trasferito"},
            "trovare":    {type:"are", stem:"trov", aux:"avere", pp:"trovato"},
            // T 补充
            "tagliare":   {type:"iare", stem:"tagli", aux:"avere", pp:"tagliato"},
            "tenere":     {type:"irr"},
            "toccare":    {type:"care", stem:"tocc", aux:"avere", pp:"toccato"},
            "togliere":   {type:"ere", stem:"togl", aux:"avere", pp:"tolto", pres:["tolgo","togli","toglie","togliamo","togliete","tolgono"], rem:["tolsi","togliesti","tolse","togliemmo","togliete","tolsero"]},
            // T 补充2
            "tastare":    {type:"are", stem:"tast", aux:"avere", pp:"tastato"},
            "temere":     {type:"ere", stem:"tem", aux:"avere", pp:"temuto"},
            "tendere":    {type:"ere", stem:"tend", aux:"avere", pp:"teso", rem:["tesi","tendesti","tese","tendemmo","tendeste","tesero"]},
            "tentare":    {type:"are", stem:"tent", aux:"avere", pp:"tentato"},
            "terminare":  {type:"are", stem:"termin", aux:"avere", pp:"terminato"},
            "testimoniare":{type:"iare", stem:"testimoni", aux:"avere", pp:"testimoniato"},
            "tingere":    {type:"ere", stem:"ting", aux:"avere", pp:"tinto", rem:["tinsi","tingesti","tinse","tingemmo","tingeste","tinsero"]},
            "tormentare": {type:"are", stem:"torment", aux:"avere", pp:"tormentato"},
            "tradire":    {type:"ire-isc", stem:"trad", aux:"avere", pp:"tradito"},
            "trainare":   {type:"are", stem:"train", aux:"avere", pp:"trainato"},
            "trarre":     {type:"irr"},
            "trasportare":{type:"are", stem:"trasport", aux:"avere", pp:"trasportato"},
            "trattare":   {type:"are", stem:"tratt", aux:"avere", pp:"trattato"},
            "trattarsi":   {type:"are-rfl", stem:"tratt", aux:"essere", pp:"trattato"},
            "tremare":    {type:"are", stem:"trem", aux:"avere", pp:"tremato"},
            "truccarsi":  {type:"are-rfl", stem:"trucc", aux:"essere", pp:"truccato"},
            "truccare":   {type:"care", stem:"trucc", aux:"avere", pp:"truccato"},
            // U
            "usare":      {type:"are", stem:"us", aux:"avere", pp:"usato"},
            "uscire":     {type:"irr"},
            // U 补充
            "utilizzare": {type:"are", stem:"utilizz", aux:"avere", pp:"utilizzato"},
            // U 补充2
            "udire":      {type:"irr"},
            "ululare":     {type:"are", stem:"ulul", aux:"avere", pp:"ululato"},
            "umiliare":   {type:"iare", stem:"umili", aux:"avere", pp:"umiliato"},
            "unire":      {type:"ire-isc", stem:"un", aux:"avere", pp:"unito"},
            "urlare":     {type:"are", stem:"url", aux:"avere", pp:"urlato"},
            // V
            "vedere":     {type:"ere", stem:"ved", aux:"avere", pp:"visto", rem:["vidi","vedesti","vide","vedemmo","vedeste","videro"], fut:["vedrò","vedrai","vedrà","vedremo","vedrete","vedranno"], cond:["vedrei","vedresti","vedrebbe","vedremmo","vedreste","vedrebbero"]},
            "vendere":    {type:"ere", stem:"vend", aux:"avere", pp:"venduto"},
            "venire":     {type:"irr"},
            "vestirsi":   {type:"ire-rfl", stem:"vest", aux:"essere", pp:"vestito"},
            "vestire":    {type:"ire", stem:"vest", aux:"avere", pp:"vestito"},
            "viaggiare":  {type:"iare", stem:"viaggi", aux:"avere", pp:"viaggiato"},
            "vincere":    {type:"ere", stem:"vinc", aux:"avere", pp:"vinto", rem:["vinsi","vincesti","vinse","vincemmo","vinceste","vinsero"]},
            "visitare":   {type:"are", stem:"visit", aux:"avere", pp:"visitato"},
            "vivere":     {type:"ere", stem:"viv", aux:"avere", pp:"vissuto", rem:["vissi","vivesti","visse","vivemmo","viveste","vissero"]},
            "volare":     {type:"are", stem:"vol", aux:"avere", pp:"volato"},
            "volere":     {type:"irr"},
            // V 补充
            "vagare":     {type:"care", stem:"vag", aux:"avere", pp:"vagato"},
            "valutare":   {type:"are", stem:"valut", aux:"avere", pp:"valutato"},
            "variare":    {type:"iare", stem:"vari", aux:"avere", pp:"variato"},
            "vendicarsi": {type:"irr"},
"vendicare":  {type:"care", stem:"vendic", aux:"avere", pp:"vendicato"},
            "versare":    {type:"are", stem:"vers", aux:"avere", pp:"versato"},
            "vibrare":    {type:"are", stem:"vibr", aux:"avere", pp:"vibrato"},
            "vigilare":   {type:"are", stem:"vigil", aux:"avere", pp:"vigilato"},
            "violentare": {type:"are", stem:"violent", aux:"avere", pp:"violentato"},
            "visualizzare":{type:"are", stem:"visualizz", aux:"avere", pp:"visualizzato"},
            // P fallback
            "parlare":    {type:"are", stem:"parl", aux:"avere", pp:"parlato"},
            // Z

    "zittirsi":    {type:"irr"},            "zittire":     {type:"ire-isc", stem:"zitt", aux:"avere", pp:"zittito"},
        };
        const REFL_PR = ["mi","ti","si","ci","vi","si"];
        const PRON = ["Io","Tu","Lui/Lei","Noi","Voi","Loro"];
        function fillAllVerbTenses() {
            // Lazily generate tenses only when needed — no-op at init time
        }
        function ensureVerbTenses(v) {
            if (!v || v._tensesReady) return;
            const meta = VCONJ[v.infinito];
            if (!meta || meta.type === "irr") {
                // Irregular: fill compound tenses if missing
                if (v.tenses && v.tenses.presente && v.aux) {
                    ensureCompounds(v);
                }
            } else if (!v.tenses || Object.keys(v.tenses).length === 0) {
                // Generate tenses for this verb on-demand
                const tenses = conjVerbs(v.infinito, meta);
                if (tenses) v.tenses = tenses;
            }
            v._tensesReady = true;
        }
        function conjVerbs(infinito, m) {
            const s = m.stem;
            const isRfl = m.type === "are-rfl" || m.type === "ere-rfl" || m.type === "ire-rfl";
            const rules = getRules(m.type);
            if (!rules) return null;
            const auxT = (k) => AUX[m.aux][k];
            const pp = m.pp;
            const r = (arr) => isRfl ? REFL_PR.map((p,i) => p + " " + arr[i]) : arr;
            const rflImpv = (e) => e.map((ee,i) => { if(!ee) return ""; const w = s+ee; return (i===2||i===5) ? "si "+w : w; });
            const cp = (k) => r(auxT(k).map(a => a + " " + pp));
            const end = (k, override) => {
                if (override) return r(override);
                const e = rules[k]; if (!e) return null;
                if (Array.isArray(e)) return r(e.map(ee => ee ? s + ee : ''));
                return [s + e]; // single string ending (inf, ger, ppres)
            };
            const endStr = (k) => Array.isArray(rules[k]) ? s + rules[k][0] : s + (rules[k] || "");
            // Handle string-style endings (inf, ger, ppres)
            const mkStr = (k) => s + (rules[k] || "");
            return {
                "presente": end("pres", m.pres),
                "passato": cp("pres"),
                "imperfetto": end("imperf", m.imperf),
                "trapassato": cp("imperf"),
                "remoto": end("rem", m.rem),
                "trapassato_remoto": cp("rem"),
                "futuro": end("fut", m.fut),
                "futuro_anteriore": cp("fut"),
                "congiuntivo": end("cong", m.cong),
                "cong_passato": cp("cong"),
                "cong_imperfetto": end("cong_imp", m.cong_imp),
                "cong_trapassato": cp("cong_imp"),
                "condizionale": end("cond", m.cond),
                "cond_passato": cp("cond"),
                "imperativo": isRfl ? rflImpv(m.impv || rules.impv) : end("impv", m.impv),
                "infinito": end("inf"),
                "infinito_passato": [m.aux + " " + pp],
                "gerundio": isRfl ? [mkStr("ger").replace(/ando$/, "andosi").replace(/endo$/, "endosi")] : end("ger"),
                "gerundio_passato": [AUX[m.aux].gerundio + " " + pp],
                "participio_pres": end("ppres"),
                "participio_pass": [pp],
            };
        }
        function getRules(type) {
            const R = {
                "are": {
                    pres:["o","i","a","iamo","ate","ano"],
                    imperf:["avo","avi","ava","avamo","avate","avano"],
                    rem:["ai","asti","ò","ammo","aste","arono"],
                    fut:["erò","erai","erà","eremo","erete","eranno"],
                    cond:["erei","eresti","erebbe","eremmo","ereste","erebbero"],
                    cong:["i","i","i","iamo","iate","ino"],
                    cong_imp:["assi","assi","asse","assimo","aste","assero"],
                    impv:["","a","i","iamo","ate","ino"],
                    inf:"are", ger:"ando", ppres:"ante"
                },
                "are-rfl": {
                    pres:["o","i","a","iamo","ate","ano"],
                    imperf:["avo","avi","ava","avamo","avate","avano"],
                    rem:["ai","asti","ò","ammo","aste","arono"],
                    fut:["erò","erai","erà","eremo","erete","eranno"],
                    cond:["erei","eresti","erebbe","eremmo","ereste","erebbero"],
                    cong:["i","i","i","iamo","iate","ino"],
                    cong_imp:["assi","assi","asse","assimo","aste","assero"],
                    impv:["","ati","i","iamoci","atevi","ino"],
                    inf:"arsi", ger:"andosi", ppres:"ante"
                },
                "care": {
                    pres:["o","hi","a","hiamo","ate","ano"],
                    imperf:["avo","avi","ava","avamo","avate","avano"],
                    rem:["ai","asti","ò","ammo","aste","arono"],
                    fut:["herò","herai","herà","heremo","herete","heranno"],
                    cond:["herei","heresti","herebbe","heremmo","hereste","herebbero"],
                    cong:["hi","hi","hi","hiamo","hiate","hino"],
                    cong_imp:["assi","assi","asse","assimo","aste","assero"],
                    impv:["","a","hi","hiamo","ate","hino"],
                    inf:"are", ger:"ando", ppres:"ante"
                },
                "iare": {
                    pres:["o","i","a","iamo","ate","ano"],
                    imperf:["avo","avi","ava","avamo","avate","avano"],
                    rem:["ai","asti","ò","ammo","aste","arono"],
                    fut:["erò","erai","erà","eremo","erete","eranno"],
                    cond:["erei","eresti","erebbe","eremmo","ereste","erebbero"],
                    cong:["i","i","i","iamo","iate","ino"],
                    cong_imp:["assi","assi","asse","assimo","aste","assero"],
                    impv:["","a","i","iamo","ate","ino"],
                    inf:"are", ger:"ando", ppres:"ante"
                },
                "ere": {
                    pres:["o","i","e","iamo","ete","ono"],
                    imperf:["evo","evi","eva","evamo","evate","evano"],
                    rem:["ei","esti","é","emmo","este","erono"],
                    fut:["erò","erai","erà","eremo","erete","eranno"],
                    cond:["erei","eresti","erebbe","eremmo","ereste","erebbero"],
                    cong:["a","a","a","iamo","iate","ano"],
                    cong_imp:["essi","essi","esse","essimo","este","essero"],
                    impv:["","i","a","iamo","ete","ano"],
                    inf:"ere", ger:"endo", ppres:"ente"
                },
                "ire": {
                    pres:["o","i","e","iamo","ite","ono"],
                    imperf:["ivo","ivi","iva","ivamo","ivate","ivano"],
                    rem:["ii","isti","ì","immo","iste","irono"],
                    fut:["irò","irai","irà","iremo","irete","iranno"],
                    cond:["irei","iresti","irebbe","iremmo","ireste","irebbero"],
                    cong:["a","a","a","iamo","iate","ano"],
                    cong_imp:["issi","issi","isse","issimo","iste","issero"],
                    impv:["","i","a","iamo","ite","ano"],
                    inf:"ire", ger:"endo", ppres:"ente"
                },
                "ire-isc": {
                    pres:["isco","isci","isce","iamo","ite","iscono"],
                    imperf:["ivo","ivi","iva","ivamo","ivate","ivano"],
                    rem:["ii","isti","ì","immo","iste","irono"],
                    fut:["irò","irai","irà","iremo","irete","iranno"],
                    cond:["irei","iresti","irebbe","iremmo","ireste","irebbero"],
                    cong:["isca","isca","isca","iamo","iate","iscano"],
                    cong_imp:["issi","issi","isse","issimo","iste","issero"],
                    impv:["","isci","isca","iamo","ite","iscano"],
                    inf:"ire", ger:"endo", ppres:"ente"
                },
                "ere-rfl": {
                    pres:["o","i","e","iamo","ete","ono"],
                    imperf:["evo","evi","eva","evamo","evate","evano"],
                    rem:["ei","esti","é","emmo","este","erono"],
                    fut:["erò","erai","erà","eremo","erete","eranno"],
                    cond:["erei","eresti","erebbe","eremmo","ereste","erebbero"],
                    cong:["a","a","a","iamo","iate","ano"],
                    cong_imp:["essi","essi","esse","essimo","este","essero"],
                    impv:["","iti","a","iamoci","etevi","ano"],
                    inf:"ersi", ger:"endosi", ppres:"ente"
                },
                "ire-rfl": {
                    pres:["o","i","e","iamo","ite","ono"],
                    imperf:["ivo","ivi","iva","ivamo","ivate","ivano"],
                    rem:["ii","isti","ì","immo","iste","irono"],
                    fut:["irò","irai","irà","iremo","irete","iranno"],
                    cond:["irei","iresti","irebbe","iremmo","ireste","irebbero"],
                    cong:["a","a","a","iamo","iate","ano"],
                    cong_imp:["issi","issi","isse","issimo","iste","issero"],
                    impv:["","iti","a","iamoci","itevi","ano"],
                    inf:"irsi", ger:"endosi", ppres:"ente"
                },
            };
            const t = R[type];
            if (!t) return null;
            // Add string endings for non-array fields
            return {
                ...t,
                endStr: (e) => e,
            };
        }
        function ensureCompounds(v) {
            // For irregular verbs: ensure compound tenses exist
            if (!v.tenses) v.tenses = {};
            const pp = v.tenses.participio_pass ? v.tenses.participio_pass[0] : null;
            if (!pp) return;
            const auxT = AUX[v.aux];
            const makeCompound = (key) => {
                if (!v.tenses[key] && auxT[key.replace("passato_","").replace("trapassato_","").replace("anteriore","fut")]) {
                    // This is complex, skip for now — manual data covers essenziale
                }
            };
        }
        // ==================== ALPHABET INDEX ====================
        function renderAlphaIndex() {
            const container = document.getElementById('alphaIndex');
            container.innerHTML = ''; // Clear for re-render
            const letters = "abcdefghijklmnopqrstuvwxyz".split("");
            letters.forEach(l => {
                const btn = document.createElement('button');
                btn.className = 'alpha-btn' + (verbData[l] ? '' : ' empty');
                btn.textContent = l.toUpperCase();
                btn.dataset.letter = l;
                if (verbData[l]) {
                    btn.onclick = () => selectLetter(l);
                }
                container.appendChild(btn);
            });
        }
        function selectLetter(l) {
            currentLetter = l;
            document.querySelectorAll('.alpha-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.letter === l);
            });
            renderVerbList(l);
        }
        // ==================== VERB LIST ====================
        function renderVerbList(l) {
            const list = document.getElementById('verbList');
            const label = document.getElementById('indexLabel');
            const header = document.getElementById('listHeader');
            const verbs = verbData[l] || [];
            header.innerHTML = `📇 动词索引 · Indice <span style="font-size:0.85em;opacity:0.9">— ${l.toUpperCase()}</span>`;
            label.innerHTML = `共 <span class="index-count">${verbs.length}</span> 个以 "${l.toUpperCase()}" 开头的动词`;
            list.innerHTML = '';
            if (verbs.length === 0) {
                list.innerHTML = '<div style="text-align:center;color:#999;padding:20px;">暂无该字母开头的动词</div>';
                return;
            }
            verbs.forEach((v, idx) => {
                const item = document.createElement('div');
                item.className = 'verb-item' + (idx === 0 ? ' active' : '');
                item.innerHTML = `
                    <div>
                        <span class="verb-name">${v.infinito}</span>
                        <span class="verb-meaning">${v.meaning}</span>
                    </div>
                    <span class="verb-tag ${v.tags.includes('irregular') ? 'irregular' : 'regular'}">
                        ${v.tags.includes('irregular') ? '不规则' : '规则'}
                    </span>
                `;
                item.onclick = () => selectVerb(l, idx, item);
                list.appendChild(item);
            });
            if (verbs.length > 0) {
                selectVerb(l, 0, list.children[0]);
            }
        }
        // ==================== SELECT VERB ====================
        function selectVerb(l, idx, el) {
            currentVerb = verbData[l][idx];
            // Generate tenses on-demand for the selected verb
            ensureVerbTenses(currentVerb);
            document.querySelectorAll('.verb-item').forEach(i => i.classList.remove('active'));
            if (el) el.classList.add('active');
            renderConjugation();
            renderDetails();
        }
        // ==================== RENDER CONJUGATION BY MOOD ====================
        function renderConjugation() {
            const container = document.getElementById('conjugationContainer');
            if (!currentVerb) {
                container.innerHTML = '<div class="card" style="padding:40px;text-align:center;color:#999;">请选择动词</div>';
                return;
            }
            const v = currentVerb;
            const isIrr = v.tags && (v.tags.includes('irregular') || v.tags.includes('irregolare'));
            container.innerHTML = '';
            moodGroups.forEach(mood => {
                // Only keep tenses that have data
                const validTenses = mood.tenses.filter(t => v.tenses[t.key]);
                if (validTenses.length === 0) return; // Skip empty moods
                const groupDiv = document.createElement('div');
                groupDiv.className = 'mood-group';
                // Mood header
                const header = document.createElement('div');
                header.className = 'mood-header';
                header.style.background = `linear-gradient(135deg, ${mood.color} 0%, ${adjustColor(mood.color, 30)} 100%)`;
                header.innerHTML = `${mood.icon} ${mood.label}`;
                groupDiv.appendChild(header);
                // Check if all tenses for this mood are non-personal (len === 1)
                const allNonPersonal = validTenses.every(t => {
                    const forms = v.tenses[t.key];
                    return forms && forms.length === 1;
                });
                if (allNonPersonal) {
                    // Non-personal grid layout
                    const grid = document.createElement('div');
                    grid.className = 'non-personal-grid';
                    validTenses.forEach(t => {
                        const forms = v.tenses[t.key];
                        const item = document.createElement('div');
                        item.className = 'non-personal-item' + (isIrr ? ' np-irregular' : '');
                        item.innerHTML = `
                            <div class="np-label">${t.label}</div>
                            <div class="np-form">${highlightEnding(forms[0], 0, isIrr)}</div>
                        `;
                        grid.appendChild(item);
                    });
                    groupDiv.appendChild(grid);
                } else {
                    // Matrix table(s)
                    const breakIdx = mood.rowBreak || validTenses.length;
                    const chunks = [];
                    for (let i = 0; i < validTenses.length; i += breakIdx) {
                        chunks.push(validTenses.slice(i, i + breakIdx));
                    }
                    chunks.forEach((chunk, ci) => {
                        const wrap = document.createElement('div');
                        wrap.className = 'matrix-wrap';
                        const table = document.createElement('table');
                        table.className = 'matrix-table';
                        // Thead
                        const thead = document.createElement('thead');
                        const trHead = document.createElement('tr');
                        const thFirst = document.createElement('th');
                        thFirst.textContent = '人称';
                        trHead.appendChild(thFirst);
                        chunk.forEach(t => {
                            const th = document.createElement('th');
                            th.innerHTML = `${t.label}`;
                            trHead.appendChild(th);
                        });
                        thead.appendChild(trHead);
                        table.appendChild(thead);
                        // Tbody
                        const tbody = document.createElement('tbody');
                        pronouns.forEach((pronoun, pi) => {
                            const tr = document.createElement('tr');
                            const tdPronoun = document.createElement('td');
                            tdPronoun.textContent = pronoun;
                            tr.appendChild(tdPronoun);
                            chunk.forEach(t => {
                                const forms = v.tenses[t.key];
                                const td = document.createElement('td');
                                td.className = isIrr ? 'cell-irregular' : '';
                                if (forms && forms[pi]) {
                                    td.innerHTML = (forms[pi] === '' || forms[pi] === '—') ? '' : highlightEnding(forms[pi], pi, isIrr);
                                } else {
                                    td.innerHTML = '<span style="color:#ddd">—</span>';
                                }
                                tr.appendChild(td);
                            });
                            tbody.appendChild(tr);
                        });
                        table.appendChild(tbody);
                        wrap.appendChild(table);
                        groupDiv.appendChild(wrap);
                    });
                }
                container.appendChild(groupDiv);
            });
        }
        function adjustColor(hex, amount) {
            const num = parseInt(hex.replace('#', ''), 16);
            const r = Math.min(255, Math.max(0, (num >> 16) + amount));
            const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
            const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        function highlightEnding(form, pi, isIrregular) {
            if (!form) return '';
            const parts = form.split(' ');
            const main = parts[parts.length - 1];
            const len = main.length;
            // Determine highlight length based on person index:
            // Io/Tu/Lui (0,1,2) → 2 chars; Noi/Voi/Loro (3,4,5) → 3 chars
            // For non-personal forms (pi is falsy/undefined), default to 2
            const hlLen = (pi === undefined || pi === null || pi < 3) ? 2 : 3;
            // If word is shorter than or equal to hlLen, highlight whole word
            if (len <= hlLen) {
                parts[parts.length - 1] = '<span class="highlight">' + main + '</span>';
                return parts.join(' ');
            }
            // Highlight last hlLen characters
            const stem = main.slice(0, -hlLen);
            const end = main.slice(-hlLen);
            parts[parts.length - 1] = stem + '<span class="highlight">' + end + '</span>';
            return parts.join(' ');
        }
        // ==================== RENDER DETAILS ====================
        function renderDetails() {
            const container = document.getElementById('detailBody');
            if (!currentVerb) {
                container.innerHTML = '<div style="text-align:center;color:#999;padding:40px;">请选择动词查看详情</div>';
                return;
            }
            const v = currentVerb;
            const isIrr = v.tags && (v.tags.includes('irregular') || v.tags.includes('irregolare'));
            const tagClass = v.tags.includes('ausiliare') ? (v.infinito === 'essere' ? 'essere' : 'avere') : (isIrr ? 'irregular' : 'regular');
            const tagText = v.tags.includes('ausiliare') ? '助动词 (ausiliare)' : (isIrr ? '不规则动词' : '规则动词');
            let examplesHtml = '';
            v.examples.forEach(ex => {
                examplesHtml += `
                    <div class="example-box">
                        <div class="example-it">${ex.it}</div>
                        <div class="example-cn">${ex.cn}</div>
                    </div>
                `;
            });
            let phrasesHtml = '';
            v.phrases.forEach(ph => {
                const parts = ph.split(' — ');
                phrasesHtml += `• <strong>${parts[0]}</strong>${parts[1] ? ` — ${parts[1]}` : ''}<br>`;
            });
            // Auto-generate tense showcase from conjugation data
            const tenseShowcase = [];
            const showcaseTenses = [
                {key: "presente", label: "现在时", ioIdx: 0, noiIdx: 3},
                {key: "passato", label: "近过去时", ioIdx: 0, noiIdx: 3},
                {key: "imperfetto", label: "未完成过去", ioIdx: 0, noiIdx: 3},
                {key: "futuro", label: "将来时", ioIdx: 0, noiIdx: 3},
            ];
            showcaseTenses.forEach(t => {
                if (v.tenses && v.tenses[t.key] && v.tenses[t.key].length > 3) {
                    const ioForm = v.tenses[t.key][t.ioIdx];
                    const noiForm = v.tenses[t.key][t.noiIdx];
                    if (ioForm !== '—' && ioForm !== '') {
                        tenseShowcase.push({label: t.label, io: ioForm, noi: noiForm});
                    }
                }
            });
            let showcaseHtml = '';
            if (tenseShowcase.length > 0) {
                showcaseHtml = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;">`;
                tenseShowcase.forEach(t => {
                    showcaseHtml += `
                        <div style="background:#FDF8F3;border:1px solid #E8D5C4;border-radius:8px;padding:10px 14px;">
                            <div style="font-size:0.78em;color:#8B6914;font-weight:600;margin-bottom:4px;">🕐 ${t.label}</div>
                            <div style="color:#2C1810;font-size:0.95em;">
                                <span style="color:#8B6914;font-weight:500;">io</span> ${highlightEnding(t.io, 0, isIrr)}
                            </div>
                            <div style="color:#2C1810;font-size:0.95em;margin-top:2px;">
                                <span style="color:#8B6914;font-weight:500;">noi</span> ${highlightEnding(t.noi, 3, isIrr)}
                            </div>
                        </div>
                    `;
                });
                showcaseHtml += `</div>`;
            }
            container.innerHTML = `
                <div class="detail-item">
                    <div class="detail-label">动词原形 · Infinito</div>
                    <div class="detail-value" style="font-size: 1.6em; font-weight: bold; color: #8B2500;">${v.infinito}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">中文含义 · Significato</div>
                    <div class="detail-value meaning">${v.meaning}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">动词类别 · Categoria</div>
                    <div class="tag-container">
                        <span class="tag ${tagClass}">${tagText}</span>
                        <span class="tag">${v.category}</span>
                        ${v.tags.includes('riflessivo') ? '<span class="tag">自反动词</span>' : ''}
                        ${v.level ? `<span class="tag tag-level">${v.level.toUpperCase()}</span>` : ''}
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">变位特征 · Caratteristiche</div>
                    <div class="detail-value">${v.features}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">助动词 · Ausiliare</div>
                    <div class="detail-value">
                        用 <strong>${v.aux}</strong> 构成复合时态
                    </div>
                </div>
                ${showcaseHtml ? `<div class="detail-item"><div class="detail-label">时态速览 · Panoramica</div>${showcaseHtml}</div>` : ''}
                <div class="detail-item">
                    <div class="detail-label">例句 · Esempi</div>
                    ${examplesHtml || '<div style="color:#999;">暂无例句</div>'}
                </div>
                <div class="detail-item">
                    <div class="detail-label">常见短语 · Frasi Comuni</div>
                    <div class="detail-value">${phrasesHtml || '暂无短语'}</div>
                </div>
            `;
        }
        // ==================== SEARCH ====================
        document.getElementById('verbSearch').addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            if (!q) return;
            let best = null;
            const letters = Object.keys(verbData).sort();
            // Priority 1: exact match
            for (const l of letters) {
                for (let i = 0; i < verbData[l].length; i++) {
                    if (verbData[l][i].infinito.toLowerCase() === q) {
                        best = { l, i }; break;
                    }
                }
                if (best) break;
            }
            // Priority 2: starts with
            if (!best) {
                for (const l of letters) {
                    for (let i = 0; i < verbData[l].length; i++) {
                        if (verbData[l][i].infinito.toLowerCase().startsWith(q)) {
                            best = { l, i }; break;
                        }
                    }
                    if (best) break;
                }
            }
            // Priority 3: contains (substring)
            if (!best) {
                for (const l of letters) {
                    for (let i = 0; i < verbData[l].length; i++) {
                        if (verbData[l][i].infinito.toLowerCase().includes(q)) {
                            best = { l, i }; break;
                        }
                    }
                    if (best) break;
                }
            }
            if (best) {
                selectLetter(best.l);
                setTimeout(() => {
                    const items = document.querySelectorAll('.verb-item');
                    if (items[best.i]) {
                        items[best.i].scrollIntoView({behavior: 'smooth', block: 'center'});
                        selectVerb(best.l, best.i, items[best.i]);
                    }
                }, 50);
            }
        });
        // ==================== START ====================
        // Progressive loading: use critical A data if available, then merge full data
        function ready() {
            if (typeof verbData !== 'undefined') {
                // Full verb-data.js already loaded → render everything
                init();
            } else if (window.__A_CRITICAL) {
                // Critical A-section data available → render A section immediately
                // without waiting for the full 300KB verb-data.js download
                verbData = {a: window.__A_CRITICAL};
                init();
                // When full verb-data.js loads, merge and enable all 26 letters
                window.__verbDataReady = function() {
                    // verbData is now overwritten by verb-data.js's var verbData = {...}
                    // Re-enable all letter buttons with correct counts
                    renderAlphaIndex();
                    // Re-render current letter's verb list if still selected
                    if (currentLetter) selectLetter(currentLetter);
                };
                // SAFETY NET: poll until full verb-data.js has loaded and replaced
                // verbData (in case the __verbDataReady callback is never invoked
                // e.g. verb-data.js forgot to call it). Guarantees the full list shows.
                let _tries = 0;
                const _iv = setInterval(function() {
                    _tries++;
                    if (typeof verbData !== 'undefined' && Object.keys(verbData).length > 1) {
                        renderAlphaIndex();
                        if (currentLetter) selectLetter(currentLetter);
                        clearInterval(_iv);
                    } else if (_tries > 40) {
                        clearInterval(_iv);
                    }
                }, 250);
            } else {
                // No critical data and no verb-data.js yet → wait for verb-data.js
                window.__verbDataReady = init;
            }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', ready);
        } else {
            ready();
        }
    
