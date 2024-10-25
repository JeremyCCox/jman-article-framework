import DownloadButton from "@/components/DownloadButton";
import {WidgetType} from "./WidgetsPanel";
import RepositoryPreview from "@/components/RepositoryPreview";

export default function WidgetDisplaySwitch({widget}:Readonly<{ widget:WidgetType }>){
    switch (widget.component){
        case("releaseDownload"):
            return (
                <>
                    <div className={'flex justify-between'}>
                        <p>Owner: <br/> {widget.values["owner"]}</p>
                        <p>Repository: <br/> {widget.values["repository"]}</p>
                    </div>
                    <DownloadButton repository={widget.values['repository']} owner={widget.values['owner']} />
                </>
            )
        case("githubPreview"):
            return (
                <>
                    <RepositoryPreview owner={widget.values["owner"]} repository={widget.values["repository"]}/>
                </>
            )
        default:
            return(<></>)
    }
}