# check  $HOME/.fabdep dir already exits or not
if [ ! -d $HOME/.fabdep ]; then
    # make fabdep dir
    mkdir -p $HOME/.fabdep
fi

# Copy updated fabdep builds to $HOME/.fabdep
yes | cp -rf $1/dockerscript $HOME/.fabdep
yes | cp -rf $1/inventory_yaml $HOME/.fabdep
yes | cp -rf $1/playlist $HOME/.fabdep
yes | cp -rf $1/fabdep-frontend $HOME/.fabdep
yes | cp -rf $1/fabdep $HOME/.fabdep
yes | cp -rf $1/fabdep.sh $HOME/.fabdep
yes | cp -rf $1/update.sh $HOME/.fabdep

rm -rf $1

rm -rf $1.zip

cd $HOME/.fabdep

yes | cp -rf fabdep-frontend/* /var/www/html/fabdep-frontend

pkill fabdep

sleep 3

./fabdep >/dev/null 2>log.txt &

xdg-open http://localhost/fabdep-frontend/index.html