package com.mytoast;

import android.app.Activity;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.longtailvideo.jwplayer.JWPlayerView;
import com.longtailvideo.jwplayer.configuration.PlayerConfig;
import com.longtailvideo.jwplayer.core.PlayerState;
import com.longtailvideo.jwplayer.events.listeners.VideoPlayerEvents;

public class JWPlayerActivity extends Activity implements VideoPlayerEvents.OnFullscreenListener, VideoPlayerEvents.OnPlayListener, VideoPlayerEvents.OnPauseListener, VideoPlayerEvents.OnCompleteListener{

    private MovableFrameLayout mPlayerContainer;
    private JWPlayerView mPlayerView;
    private PlayerState mPlayerState;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mPlayerContainer = (MovableFrameLayout) findViewById(R.id.player_container);

        mPlayerView = new JWPlayerView(this, new PlayerConfig.Builder()
                .file("https://tungsten.aaplimg.com/VOD/bipbop_adv_example_v2/master.m3u8")
                .build());
        mPlayerView.addOnFullscreenListener(this);
        mPlayerView.addOnPlayListener(this);
        mPlayerView.addOnPauseListener(this);
        mPlayerView.addOnCompleteListener(this);

        // Add the View to the View Hierarchy.
        mPlayerContainer.addView(mPlayerView);
        setInitialLayoutParams();
    }

    @Override
    public void onFullscreen(boolean fullscreen) {
    }

    private void setInitialLayoutParams() {
        DisplayMetrics displayMetrics = getResources().getDisplayMetrics();
        if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            mPlayerContainer.setLayoutParams(new RelativeLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, (displayMetrics.widthPixels / 16) * 9)); // 16:9
        } else {
            // We need to use height to calculate a 16:9 ratio since we're in landscape mode.
            mPlayerContainer.setLayoutParams(new RelativeLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, (displayMetrics.heightPixels / 16) * 9)); // 16:9
            // Toggle fullscreen, since we're in landscape mode.
            mPlayerView.setFullscreen(true, true);
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // If we are in fullscreen mode, exit fullscreen mode when the user uses the back button.
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (mPlayerView.getFullscreen()) {
                mPlayerView.setFullscreen(false, true);
                return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onPlay(PlayerState playerState) {
        mPlayerState = playerState;
    }

    @Override
    public void onComplete() {
        mPlayerState = PlayerState.IDLE;
    }

    @Override
    public void onPause(PlayerState playerState) {
        mPlayerState = playerState;
    }
}
