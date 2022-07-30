import { collection, addDoc, setDoc , doc, getDocs, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { firestore, firebase, serverTimestamp  } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import kebabCase from 'lodash.kebabcase';

export default function Page({ }) {
    let title = "This is a demopost" + uuidv4().toString()
    const onClick = async () => {
        const Demopost = new demopost(title)
        const docRef = await setDoc(doc(firestore, "projects", Demopost.slug), {
            ...Demopost
        });
        title = "This is a demopost" + uuidv4().toString();
    }
    const onClick2 = async () => {
        const thingref = collection(firestore, "projects")
        const q = await query(thingref, orderBy("slug"), limit(1))
        title = "This is a demopost" + uuidv4().toString();
        const querySnapshot = await getDocs(q);
        let slug = ""
        querySnapshot.forEach(async (doc) => {
            slug = doc.data().slug
        });
        await deleteDoc(doc(firestore, "projects", slug))
    }
    class demopost {
        constructor(Title) {
            this.title= Title,
            this.slug= encodeURI(kebabCase(Title)),
            this.tldr= "this is a demo tldr, Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, magnam blanditiis nam tenetur aut corrupti minus repellendus quasi obcaecati quibusdam alias assumenda cupiditate voluptatibus exercitationem molestias velit dolores nobis rerum consequatur enim! Aliquam recusandae ratione, excepturi eius sint dolorem dicta corrupti. Animi eum eius iusto harum nesciunt placeat sed voluptas porro reiciendis error autem expedita, sequi explicabo. Iure quisquam facilis, voluptate non, qui mollitia, maiores odio vitae impedit assumenda molestiae vero quibusdam delectus nesciunt. Suscipit quae odio hic nesciunt quia inventore assumenda non ut. Sint recusandae doloribus libero nisi cupiditate expedita magnam voluptatibus, ducimus excepturi? Itaque nemo veritatis quasi dicta vitae vero cumque! Quibusdam perferendis, magni iusto facilis inventore suscipit quae eaque beatae dolore optio voluptatum cumque itaque temporibus? Natus harum autem numquam mollitia quo doloremque sed! Error velit incidunt possimus eaque tenetur ullam maxime, eius quasi provident dolor. Fugiat, voluptatum, reprehenderit iusto eaque expedita sed omnis quasi at, quisquam vero tempora aspernatur quos pariatur ex. Recusandae suscipit, distinctio commodi in porro, illo quasi fugiat deleniti sequi amet, consequatur ad quo eaque magnam reiciendis voluptatum aliquam odio labore id aliquid? Voluptates dolorem cupiditate nihil nemo provident ex, debitis adipisci vero tempore numquam consequuntur ducimus voluptatem eveniet alias? Fugit velit similique eaque libero voluptates, accusamus, magnam pariatur reiciendis?",
            this.imgurl= "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
            this.description= "This is a test Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque reprehenderit consequuntur itaque repellat error maiores minus, dolore blanditiis distinctio, corporis, nulla voluptatem eligendi. Ab ipsam sit, architecto ratione sunt vel suscipit alias neque, quaerat nulla error nam fugit voluptates blanditiis, veniam culpa doloremque ex accusamus corporis nesciunt. Ex accusantium vel at nobis aliquid sed ab quis excepturi perferendis deserunt! Natus nulla enim eum voluptas quae dicta voluptatem ipsa saepe vero vel laborum repudiandae, architecto aspernatur non dolore necessitatibus iure repellat? Quibusdam nam ad animi deleniti. Quae error sint quaerat hic quasi ea facere excepturi minus, inventore natus adipisci nisi reprehenderit obcaecati exercitationem voluptatem accusantium aliquam sequi possimus incidunt sed sunt consequuntur eum. Praesentium libero sint atque, eligendi autem sequi fuga odio, ullam vitae, accusantium ea molestiae dolorem commodi. Molestias facilis enim quae magnam, ducimus laboriosam beatae vel unde necessitatibus consectetur quia similique, ea modi eligendi nostrum soluta, earum aspernatur? Nobis sunt error quibusdam officia ut adipisci vel aut et eligendi. Porro eligendi labore doloremque a perferendis exercitationem aperiam voluptatem, id iure dolorem officiis eaque ipsa necessitatibus! Assumenda, obcaecati nostrum, quod voluptatem consectetur ex rerum culpa, quisquam vitae recusandae amet? Quis nihil repudiandae molestiae debitis, sit sed cupiditate consequatur nisi maxime non nobis perspiciatis nam reprehenderit, ea aliquid molestias! Assumenda reiciendis asperiores facere! Dicta qui placeat labore atque, iure deleniti itaque, vero unde quas reprehenderit fugit quod magnam mollitia. Aspernatur assumenda dolorem recusandae nobis laboriosam alias, necessitatibus nisi facere, consequatur enim quibusdam error voluptatibus eaque quod eligendi veritatis! Eveniet, pariatur. Quod magnam natus porro repudiandae a eos voluptatem quos in perferendis excepturi, dolorum fuga ut numquam suscipit, molestias rem impedit? Esse cumque sed suscipit id modi fuga, necessitatibus voluptas, a temporibus quas eum exercitationem laudantium architecto cum aut corrupti nulla, facere deserunt iusto dignissimos debitis. Culpa, hic consectetur. Repellat quia maxime veritatis quidem nam blanditiis provident, nobis corporis possimus nisi aliquid distinctio in quisquam commodi molestiae doloribus, quaerat pariatur similique sed quae molestias? Nobis laudantium numquam asperiores, hic consequuntur odit, vel accusamus quos quia nemo architecto tempore totam blanditiis, esse sed. Praesentium numquam facilis alias, laborum facere impedit quo, similique natus consequuntur dolor eius doloremque modi illum provident quibusdam fuga a repellat voluptatum possimus quos enim nobis? Nisi reprehenderit rerum voluptatibus reiciendis est suscipit commodi sed non, quaerat incidunt inventore iste iusto nulla magni impedit mollitia dolore beatae unde, animi fugiat adipisci possimus facere aspernatur eveniet. Ad tempore minus accusantium voluptatibus, quam adipisci molestiae! Ex provident praesentium id enim laudantium, repellendus inventore, odio cumque voluptatem placeat repudiandae vitae, eius obcaecati dolorum voluptates blanditiis possimus? Maxime praesentium unde nostrum. Tempora possimus consequuntur atque aliquam ducimus ipsum molestiae voluptates sed nisi, ut similique rerum minus quo? Fuga officiis ratione doloremque a accusantium! Cumque accusantium asperiores, tenetur quasi obcaecati eos nisi, quisquam nobis sunt nam animi soluta. Eaque minus esse perferendis. Quo debitis nam amet modi. Eaque amet velit tempora ipsa recusandae soluta commodi atque saepe, reiciendis sequi temporibus nostrum tempore modi nihil dolores deleniti reprehenderit vero quam at quasi, eius sunt. Aliquid, minima.",
            this.github= "https://github.com/seesi8/Memento",
            this.livedemo= "https://memento.samueldoes.dev",
            this.datemade= new Date().toString()
        }
    }
    return (
        <main>
            <button onClick={onClick} style={{width:'10vw', height:'10vh'}}></button>
            <button onClick={onClick2} style={{width:'10vw', height:'10vh'}}></button>
        </main>
    )
}