"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    const router = useRouter();
    const {user, isLoading} = useUser();

    useEffect(() => {
        if(!isLoading && !user) {
            router.replace('/');
        }


    },[isLoading, user, router]);
    

    console.log(songs);
    const validSongs = songs.filter(song => song.id && song.title && song.image_path);


    if(validSongs.length===0)
    {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No Liked Songs found.
            </div>
        )
    }

    
    

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
        {validSongs.map((song) => (
            <div key = {song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                    <MediaItem onClick={(id:string) => onPlay(id)} data = {song} />
                </div>
                <LikeButton songId = {song.id} />
            </div>
        ))}
    </div>
  )

}

export default LikedContent